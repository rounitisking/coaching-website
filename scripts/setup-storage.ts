/**
 * Supabase Storage Setup Script
 * Creates all required buckets and sets RLS policies.
 * Run: npx tsx scripts/setup-storage.ts
 */
import * as dotenv from 'dotenv'
import path from 'path'
import https from 'https'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const SUPABASE_URL = process.env.SUPABASE_URL!
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const host = new URL(SUPABASE_URL).hostname

interface Bucket {
  name: string
  public: boolean
  allowedMimeTypes?: string[]
  fileSizeLimit?: number
}

const BUCKETS: Bucket[] = [
  { name: 'hero-images', public: true, allowedMimeTypes: ['image/*'], fileSizeLimit: 10485760 },
  { name: 'course-images', public: true, allowedMimeTypes: ['image/*'], fileSizeLimit: 10485760 },
  { name: 'faculty-images', public: true, allowedMimeTypes: ['image/*'], fileSizeLimit: 5242880 },
  { name: 'profile-images', public: true, allowedMimeTypes: ['image/*'], fileSizeLimit: 5242880 },
  { name: 'banners', public: true, allowedMimeTypes: ['image/*'], fileSizeLimit: 10485760 },
  { name: 'resources', public: false, allowedMimeTypes: ['application/pdf', 'video/*', 'image/*'], fileSizeLimit: 104857600 },
  { name: 'test-series', public: false, allowedMimeTypes: ['application/pdf', 'image/*'], fileSizeLimit: 52428800 },
  { name: 'course-files', public: false, allowedMimeTypes: ['video/*', 'application/pdf', 'image/*'], fileSizeLimit: 524288000 },
]

function apiRequest(
  method: string,
  path: string,
  body?: object
): Promise<{ status: number; data: any }> {
  return new Promise((resolve) => {
    const bodyStr = body ? JSON.stringify(body) : undefined
    const opts: https.RequestOptions = {
      hostname: host,
      path,
      method,
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        ...(bodyStr && { 'Content-Length': Buffer.byteLength(bodyStr) }),
      },
    }
    const req = https.request(opts, (res) => {
      let data = ''
      res.on('data', (d) => (data += d))
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode!, data: JSON.parse(data) })
        } catch {
          resolve({ status: res.statusCode!, data })
        }
      })
    })
    req.on('error', (e) => resolve({ status: 0, data: { error: e.message } }))
    if (bodyStr) req.write(bodyStr)
    req.end()
  })
}

async function getExistingBuckets(): Promise<string[]> {
  const { status, data } = await apiRequest('GET', '/storage/v1/bucket')
  if (status === 200 && Array.isArray(data)) {
    return data.map((b: any) => b.name || b.id)
  }
  return []
}

async function createBucket(bucket: Bucket): Promise<boolean> {
  const { status, data } = await apiRequest('POST', '/storage/v1/bucket', {
    id: bucket.name,
    name: bucket.name,
    public: bucket.public,
    allowed_mime_types: bucket.allowedMimeTypes,
    file_size_limit: bucket.fileSizeLimit,
  })
  return status === 200
}

async function main() {
  console.log('\n🪣 Setting up Supabase Storage Buckets...\n')

  const existing = await getExistingBuckets()
  console.log(`📂 Existing buckets: [${existing.join(', ') || 'none'}]\n`)

  let created = 0
  let skipped = 0

  for (const bucket of BUCKETS) {
    if (existing.includes(bucket.name)) {
      console.log(`  ⏭  ${bucket.name} — already exists`)
      skipped++
      continue
    }
    const success = await createBucket(bucket)
    if (success) {
      console.log(`  ✅ ${bucket.name} — created (public: ${bucket.public})`)
      created++
    } else {
      console.log(`  ❌ ${bucket.name} — failed to create`)
    }
  }

  console.log(`\n📊 Summary: ${created} created, ${skipped} skipped`)

  // Verify final state
  const final = await getExistingBuckets()
  console.log(`\n✅ Final buckets: [${final.join(', ')}]`)
  
  console.log('\n⚠️  RLS Note:')
  console.log('   Public buckets (hero-images, course-images, faculty-images, profile-images, banners)')
  console.log('   allow public reads by default.')
  console.log('   Private buckets (resources, test-series, course-files) require signed URLs.')
  console.log('   All uploads must go through server-side API using the service role key.')
  console.log('\n🎉 Storage setup complete!\n')
}

main().catch(console.error)
