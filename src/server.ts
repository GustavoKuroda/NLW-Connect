import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import {
    validatorCompiler,
    serializerCompiler,
    ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { z } from 'zod';

const app = fastify().withTypeProvider<ZodTypeProvider>(); // Enable Zod type provider

app.register(fastifyCors) // Enable CORS for all routes

app.setValidatorCompiler(validatorCompiler); // Enable Zod validation
app.setSerializerCompiler(serializerCompiler); // Enable Zod serialization

app.post('/subscriptions', { // Define a route with validation and serialization
    schema: {
        body: z.object({
            name: z.string(),
            email: z.string().email(),
        }),
    },
}, (request, reply) => {
    const { name, email } = request.body; // Get the validated and serialized data from the request

    // Do something with the data, like saving it to a database

    return reply.send(201).send({ name, email }); // Send the data back to the client as a response
})

app.listen({ port:3333 }).then(() => { // Start the server
    console.log('HTTP server running!');
});