import { defineConfig } from 'drizzle-kit'

// const DATABASE_URL = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL as string
export default defineConfig({
    schema: "./src/utils/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'DATABASE_URL',
    },
    verbose: true,
    strict: true,
})