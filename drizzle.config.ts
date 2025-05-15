import { defineConfig } from 'drizzle-kit'

// const DATABASE_URL = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL as string
export default defineConfig({
    schema: "./src/utils/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://Genai_owner:G9I5dygjLNVM@ep-withered-wind-a53ohaw5-pooler.us-east-2.aws.neon.tech/AIFormify?sslmode=require',
    },
    verbose: true,
    strict: true,
})