import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  // Define a route with validation and serialization
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe to an event',
        tags: ['subscription'],
        description: 'Subscribe to an event by providing your name and email',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          // Define the response schema
          201: z.object({
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body // Get the validated and serialized data from the request

      // Do something with the data, like saving it to a database

      // Return the data in the response
      return reply.status(201).send({
        name,
        email,
      })
    }
  )
}
