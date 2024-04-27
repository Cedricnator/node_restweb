import { Router }          from "express";
import { TodosController } from ".";
import { TodoDataSource } from "../../../domain";
import { TodoDataSourceImpl } from "../../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepository } from '../../../domain/repositories/todo.repository';
import { TodoRepositoryImpl } from "../../../infrastructure/repositories/todo.repository.impl";

//* Estas son las rutas de mis TODOS
//* SIEMPRE Pensar que nadie sabe como usar el backend y lo usaran mal
export class TodoRoutes {
    static get routes(): Router {
        const router = Router();

        const dataSource = new TodoDataSourceImpl;
        const TodoRepository = new TodoRepositoryImpl(dataSource);
        
        const todoController = new TodosController(TodoRepository);

        // Solo pasamos la referencia a la funcion ya que tenemos los mismos argumentos que la funcion
        // Nuestros endpoints del todo
        router.get( '/'     , todoController.getTodos    );
        router.get( '/:id'  , todoController.getTodoById );
        router.post( '/'    , todoController.createTodo  );
        router.put( '/:id'  , todoController.updateTodo  );
        router.delete('/:id', todoController.deleteTodo  );
        return router;
    }
}