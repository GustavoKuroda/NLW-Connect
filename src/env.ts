// Description: This file defines the environment variables schema and parses the environment variables.

import { z } from 'zod'

// Define the environment schema
const envSchema = z.object({
  PORT: z.coerce.number().default(3333), // Default to 3333 if PORT is not set
})

// Parse the environment variables
export const env = envSchema.parse(process.env)
