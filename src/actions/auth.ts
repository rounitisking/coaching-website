'use server'
import { db } from '@/lib/db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { auth } from '@/lib/auth'
import { sendPasswordResetEmail } from '@/lib/email'
import { revalidatePath } from 'next/cache'
import type { ActionResult } from '@/types'

// revalidatePath is imported for future use when profile pages are added
void revalidatePath

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
})

export async function registerUser(data: unknown): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const { name, email, password } = parsed.data
  const existing = await db.user.findUnique({ where: { email } })
  if (existing) return { error: 'Email already registered' }

  const hashedPassword = await bcrypt.hash(password, 12)
  await db.user.create({ data: { name, email, password: hashedPassword, role: 'USER' } })
  return { success: true }
}

export async function forgotPassword(email: string): Promise<ActionResult> {
  const user = await db.user.findUnique({ where: { email } })
  // Always return success to prevent email enumeration
  if (!user) return { success: true }

  // Delete existing tokens for this user
  await db.passwordReset.deleteMany({ where: { userId: user.id } })

  const reset = await db.passwordReset.create({
    data: {
      userId: user.id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    },
  })

  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${reset.token}`
  await sendPasswordResetEmail(email, resetUrl)
  return { success: true }
}

export async function resetPassword(
  token: string,
  password: string
): Promise<ActionResult> {
  const reset = await db.passwordReset.findUnique({ where: { token } })
  if (!reset || reset.used || reset.expiresAt < new Date()) {
    return { error: 'Invalid or expired reset link' }
  }

  const hashed = await bcrypt.hash(password, 12)
  await db.user.update({ where: { id: reset.userId }, data: { password: hashed } })
  await db.passwordReset.update({ where: { id: reset.id }, data: { used: true } })
  return { success: true }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<ActionResult> {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Not authenticated' }

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user?.password) return { error: 'No password set' }

  const isValid = await bcrypt.compare(currentPassword, user.password)
  if (!isValid) return { error: 'Current password is incorrect' }

  const hashed = await bcrypt.hash(newPassword, 12)
  await db.user.update({ where: { id: user.id }, data: { password: hashed } })
  return { success: true }
}

export async function updateProfile(data: { name?: string; phone?: string; image?: string }): Promise<ActionResult> {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Not authenticated' }
  
  await db.user.update({
    where: { id: session.user.id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.phone && { phone: data.phone }),
      ...(data.image && { image: data.image }),
    }
  })
  
  revalidatePath('/dashboard/profile')
  return { success: true }
}

