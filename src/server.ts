import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'

const app = fastify().withTypeProvider<ZodTypeProvider>() // Enable Zod type provider

app.register(fastifyCors) // Enable CORS for all routes

app.setValidatorCompiler(validatorCompiler) // Enable Zod validation
app.setSerializerCompiler(serializerCompiler) // Enable Zod serialization

// Enable Swagger documentation
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW-Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

// Enable Swagger UI
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// Register routes
app.register(subscribeToEventRoute)

// Start the server
app.listen({ port: env.PORT }).then(() => {
  // Use the PORT value from env.ts
  console.log('HTTP server running!')
})
