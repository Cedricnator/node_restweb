//* Archivo de rutas que maneja mi aplicación
//* Es un enrutador global, todas las rutas estan aqui

import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        //* Routes
        router.use( '/api/todos', TodoRoutes.routes );
        

        return router;
    }
}