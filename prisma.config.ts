import { defineConfig } from 'prisma/config'
import * as dotenv from 'dotenv'
import path from 'path'

// Load .env.local for Prisma CLI commands (migrate, generate, etc.)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: DATABASE_URL,
  },
})
