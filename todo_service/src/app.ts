import { Server, AppRoutes } from "./presentation";
import { envs }              from "./config";

//* Función autoinvocada
( async() => {
    main();
} ) ();

function main() {
    const server = new Server({
        port:        envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes:      AppRoutes.routes
    });

    server.start();
}