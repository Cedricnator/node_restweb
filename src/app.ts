import { Server } from "./presentation";

( async() => {
    main();
}) ();

function main() {

    const server = new Server();
    server.start();
}


