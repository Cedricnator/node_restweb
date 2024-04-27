//* El controlador es un mecanismo que permite separar la responsabilidad del router y del controlador
import { Request, Response } from 'express';

const todos = [
    { id: 1, text: 'Buy milk',   createdAt: new Date() },
    { id: 2, text: 'Buy bread',  createdAt: new Date() },
    { id: 3, text: 'Buy cheese', createdAt: new Date() },
    { id: 4, text: 'Buy butter', createdAt: new Date() },
]

export class TodosController {

    //* DI, aca vamos a querer inyectar nuestro repositorios y nuestras rutas usen ese repositorio
    //* Mejor aun. inyectar el repositorio para implementar y usarlo mediante casos de uso
    constructor(){}

    public getTodos = (req: Request, res: Response) => {
        res.json( todos )
    }

    //* El operador + convierte un string a un numero
    public getTodoById = (req: Request, res: Response ) => {
        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(400).json({ error: 'ID Argument must be a number'})

        const todo = todos.find( todo => todo.id === id );
        ( todo )
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with id ${id} not found` })
    }

    public createTodo = ( req: Request, res: Response ) => {
        const body = req.body;
        res.json({ message: body })
    }
}