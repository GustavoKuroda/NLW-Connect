// Description: This file defines the environment variables schema and parses the environment variables.

import { z } from 'zod'

// Define the environment schema
const envSchema = z.object({
  PORT: z.coerce.number().default(3333), // Default to 3333 if PORT is not set
  POSTGRES_URL: z.string().url(), // Validate that POSTGRES_URL is a valid URL
  REDIS_URL: z.string().url(), // Validate that REDIS_URL is a valid URL
})

// Parse the environment variables
export const env = envSchema.parse(process.env)
