import { createClient, SupabaseClient } from '@supabase/supabase-js'

// ─── Bucket names (use these constants everywhere) ──────────────────────────
export const BUCKETS = {
  HERO_IMAGES: 'hero-images',
  COURSE_IMAGES: 'course-images',
  FACULTY_IMAGES: 'faculty-images',
  PROFILE_IMAGES: 'profile-images',
  BANNERS: 'banners',
  RESOURCES: 'study-resources',   // 'resources' is reserved in Supabase
  TEST_SERIES: 'test-series',
  COURSE_FILES: 'course-media',   // 'course-files' exceeded size limit, renamed
} as const

export type BucketName = (typeof BUCKETS)[keyof typeof BUCKETS]

// ─── Lazy clients (avoid throwing at import time in Next.js edge/client) ────
let _serverClient: SupabaseClient | null = null
let _publicClient: SupabaseClient | null = null

export function getServerClient(): SupabaseClient {
  if (!_serverClient) {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    _serverClient = createClient(url, key, { auth: { persistSession: false } })
  }
  return _serverClient
}

export function getPublicClient(): SupabaseClient {
  if (!_publicClient) {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_ANON_KEY
    if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY')
    _publicClient = createClient(url, key, { auth: { persistSession: false } })
  }
  return _publicClient
}

// Keep named exports for backward compat
export const serverClient = { get storage() { return getServerClient().storage } }

/**
 * Upload a file buffer to a Supabase storage bucket.
 * Uses the service-role client so it bypasses RLS.
 */
export async function uploadFile(
  bucket: BucketName,
  filePath: string,
  fileBuffer: Buffer | Uint8Array,
  contentType: string
): Promise<{ url: string } | { error: string }> {
  try {
    const client = getServerClient()
    const { data, error } = await client.storage
      .from(bucket)
      .upload(filePath, fileBuffer, { contentType, upsert: true })

    if (error) return { error: error.message }

    const { data: { publicUrl } } = client.storage.from(bucket).getPublicUrl(data.path)
    return { url: publicUrl }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'Upload failed' }
  }
}

/** Get the public URL of a file (for public buckets). */
export function getPublicUrl(bucket: BucketName, path: string): string {
  const { data: { publicUrl } } = getServerClient().storage.from(bucket).getPublicUrl(path)
  return publicUrl
}

/** Get a time-limited signed URL for a private bucket file. */
export async function getSignedUrl(
  bucket: BucketName,
  path: string,
  expiresIn = 3600
): Promise<string> {
  const { data, error } = await getServerClient().storage
    .from(bucket)
    .createSignedUrl(path, expiresIn)

  if (error || !data?.signedUrl) {
    throw new Error(error?.message ?? 'Failed to create signed URL')
  }
  return data.signedUrl
}

/** Delete a file from a storage bucket. */
export async function deleteFile(bucket: BucketName, path: string): Promise<void> {
  const { error } = await getServerClient().storage.from(bucket).remove([path])
  if (error) throw new Error(error.message)
}
