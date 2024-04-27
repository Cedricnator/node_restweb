//* Implementación sin inyeccion de dependencias

import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
    routes: Router;
}

export class Server {

    // Aca se define el servidor
    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor( options: Options ){
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    async start(){

        //* Middlewares.
        this.app.use( express.json() ); // permite el 'raw'
        this.app.use( express.urlencoded({ extended: true })); // permite el x-www-form-urlencoded 

        //* Public Folder.
        this.app.use(express.static( this.public_path ) );

        //* Routes.
        this.app.use( this.routes );
        
        //* For any other route, serve the index.html.
        this.app.get('*', ( req, res) => {
            console.log( req.url );
            const indexPath = path.join( __dirname + `'../../../${ this.public_path }/index.html'`)
            res.sendFile(indexPath);
        })

        //* Start the server, listen on the port, Is a Logger.
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${ this.port }`);
        })
    }
}