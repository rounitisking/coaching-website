'use server'

import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { isRazorpayConfigured, createRazorpayOrder, verifyRazorpaySignature } from '@/lib/razorpay'
import type { CartItem, ActionResult } from '@/types'
import { revalidatePath } from 'next/cache'

export async function createOrderAction(
  items: CartItem[]
): Promise<ActionResult & { orderId?: string; razorpayOrderId?: string; amount?: number }> {
  try {
    const session = await auth()
    if (!session?.user?.id) return { error: 'Please login to continue' }

    if (!isRazorpayConfigured()) {
      return { error: 'Online payments are currently disabled. Please contact Academica Institute to enroll.' }
    }

    const total = items.reduce((sum, item) => sum + item.price, 0)
    if (total <= 0) return { error: 'Invalid order amount' }

    const order = await db.order.create({
      data: {
        userId: session.user.id,
        amount: total,
        status: 'PENDING',
        items: {
          create: items.map((item) => ({
            itemType: item.type,
            itemId: item.id,
            title: item.title,
            price: item.price,
          })),
        },
      },
    })

    const rzpOrder = await createRazorpayOrder(total, 'INR', order.id)
    await db.order.update({
      where: { id: order.id },
      data: { razorpayOrderId: rzpOrder.id },
    })

    return {
      success: true,
      orderId: order.id,
      razorpayOrderId: rzpOrder.id,
      amount: total,
    }
  } catch (error: any) {
    console.error('Order creation error:', error)
    return { error: error.message || 'Failed to create order' }
  }
}

export async function verifyPaymentAction(data: {
  orderId: string
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
}): Promise<ActionResult> {
  try {
    const session = await auth()
    if (!session?.user?.id) return { error: 'Unauthorized' }

    const isValid = verifyRazorpaySignature(
      data.razorpayOrderId,
      data.razorpayPaymentId,
      data.razorpaySignature
    )

    if (!isValid) return { error: 'Payment signature verification failed' }

    const order = await db.order.update({
      where: { id: data.orderId },
      data: {
        status: 'PAID',
        razorpayPaymentId: data.razorpayPaymentId,
        razorpaySignature: data.razorpaySignature,
      },
      include: { items: true },
    })

    // Process each item and grant access
    const promises = order.items.map(async (item) => {
      if (item.itemType === 'COURSE') {
        await db.enrollment.upsert({
          where: { userId_courseId: { userId: session.user.id, courseId: item.itemId } },
          create: { userId: session.user.id, courseId: item.itemId, orderId: order.id, isActive: true },
          update: { isActive: true, orderId: order.id },
        })
      } else if (item.itemType === 'TEST_SERIES') {
        await db.testPurchase.upsert({
          where: { userId_testSeriesId: { userId: session.user.id, testSeriesId: item.itemId } },
          create: { userId: session.user.id, testSeriesId: item.itemId, orderId: order.id, isActive: true },
          update: { isActive: true, orderId: order.id },
        })
      } else if (item.itemType === 'RESOURCE') {
        await db.resourcePurchase.upsert({
          where: { userId_resourceId: { userId: session.user.id, resourceId: item.itemId } },
          create: { userId: session.user.id, resourceId: item.itemId, orderId: order.id },
          update: { orderId: order.id },
        })
      }
    })

    await Promise.all(promises)
    return { success: true }
  } catch (error: any) {
    console.error('Payment verification error:', error)
    return { error: error.message || 'Payment verification failed' }
  }
}

export async function createMockOrder({
  itemId,
  itemType,
  userId,
}: {
  itemId: string
  itemType: string
  userId: string
}): Promise<{ success?: boolean; orderId?: string; error?: string }> {
  try {
    let title = 'Purchase'
    let amount = 0

    if (itemType === 'course') {
      const course = await db.course.findUnique({
        where: { id: itemId },
        select: { title: true, price: true },
      })
      if (!course) return { error: 'Course not found' }
      title = course.title
      amount = course.price
    } else if (itemType === 'test-series') {
      const ts = await db.testSeries.findUnique({
        where: { id: itemId },
        select: { title: true, price: true },
      })
      if (!ts) return { error: 'Test series not found' }
      title = ts.title
      amount = ts.price
    } else if (itemType === 'resource') {
      const res = await db.resource.findUnique({
        where: { id: itemId },
        select: { title: true, price: true },
      })
      if (!res) return { error: 'Resource not found' }
      title = res.title
      amount = res.price
    }

    // Create order
    const order = await db.order.create({
      data: {
        userId,
        amount,
        currency: 'INR',
        status: 'PAID',
        razorpayPaymentId: `MOCK_${Date.now()}`,
        items: {
          create: {
            itemType: itemType === 'course' ? 'COURSE' : itemType === 'test-series' ? 'TEST_SERIES' : 'RESOURCE',
            itemId,
            title,
            price: amount,
          },
        },
      },
    })

    // Create access record
    if (itemType === 'course') {
      await db.enrollment.upsert({
        where: { userId_courseId: { userId, courseId: itemId } },
        create: { userId, courseId: itemId, orderId: order.id, isActive: true },
        update: { isActive: true, orderId: order.id },
      })
    } else if (itemType === 'test-series') {
      await db.testPurchase.upsert({
        where: { userId_testSeriesId: { userId, testSeriesId: itemId } },
        create: { userId, testSeriesId: itemId, orderId: order.id, isActive: true },
        update: { isActive: true, orderId: order.id },
      })
    } else if (itemType === 'resource') {
      await db.resourcePurchase.upsert({
        where: { userId_resourceId: { userId, resourceId: itemId } },
        create: { userId, resourceId: itemId, orderId: order.id },
        update: { orderId: order.id },
      })
    }

    revalidatePath('/dashboard')
    return { success: true, orderId: order.id }
  } catch (e: any) {
    console.error('createMockOrder error:', e)
    return { error: e.message || 'Order failed' }
  }
}

