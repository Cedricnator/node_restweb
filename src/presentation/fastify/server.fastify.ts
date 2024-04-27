import { fastify } from 'fastify';

const server = fastify({ logger: true });

server.get('/', (req, reply) => {
    reply.send({ hello: 'world' });
})


export const start = async () => {
    try {
        await server.listen({ port: 3002 });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};