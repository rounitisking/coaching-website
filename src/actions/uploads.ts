'use server'

import { uploadFile, deleteFile, BucketName } from '@/lib/supabase'
import { auth } from '@/lib/auth'

export async function uploadToStorage(
  bucket: BucketName,
  fileName: string,
  base64Data: string,
  contentType: string
): Promise<{ url: string } | { error: string }> {
  try {
    const session = await auth()
    if (!session?.user) return { error: 'Unauthorized' }

    // Convert base64 back to buffer
    const buffer = Buffer.from(base64Data, 'base64')

    // Validate size limit (max 10MB)
    if (buffer.byteLength > 10 * 1024 * 1024) {
      return { error: 'File size exceeds 10MB limit' }
    }

    const fileExt = fileName.split('.').pop()
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    
    const result = await uploadFile(bucket, uniqueName, buffer, contentType)
    return result
  } catch (error: any) {
    console.error('Storage upload error:', error)
    return { error: error.message || 'Upload failed' }
  }
}

export async function deleteFromStorage(bucket: BucketName, path: string): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth()
    if (session?.user?.role !== 'ADMIN') return { success: false, error: 'Unauthorized' }

    await deleteFile(bucket, path)
    return { success: true }
  } catch (error: any) {
    console.error('Storage deletion error:', error)
    return { success: false, error: error.message || 'Deletion failed' }
  }
}
