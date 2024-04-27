import { Server, AppRoutes } from "./presentation/express";
import { envs }              from "./config";
import { start }             from "./presentation/fastify/server.fastify";

//* Función autoinvocada
( async() => {
    main();
} ) ();

function main() {
    
    //* Express
    // const server = new Server({
    //     port:        envs.PORT,
    //     public_path: envs.PUBLIC_PATH,
    //     routes:      AppRoutes.routes
    // });

    //* Fastify
    start();

    // server.start();
}