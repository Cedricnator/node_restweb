import { Router } from "express";
import { TodosController } from "./controller";

//* Estas son las rutas de mis TODOS
export class TodoRoutes {

    static get routes(): Router {
        const router = Router();
        const todoController = new TodosController();

         //* Solo pasamos la referencia a la funcion ya que tenemos los mismos argumentos que la funcion
        router.get('/', todoController.getTodos)

        return router;
    }


}