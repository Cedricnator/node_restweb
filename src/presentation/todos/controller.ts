//* El controlador es un mecanismo que permite separar la responsabilidad del router y del controlador
import { Request, Response } from 'express';

const todos = [
    { id: 1, text: 'Buy milk',   completedAt: new Date() },
    { id: 2, text: 'Buy bread',  completedAt: new Date() },
    { id: 3, text: 'Buy cheese', completedAt: null },
    { id: 4, text: 'Buy butter', completedAt: new Date() },
]

export class TodosController {

    //* DI, aca vamos a querer inyectar nuestro repositorios y nuestras rutas usen ese repositorio
    //* Mejor aun. inyectar el repositorio para implementar y usarlo mediante casos de uso
    constructor(){}

    public getTodos = (req: Request, res: Response) => res.json( todos )
    
    //* El operador + convierte un string a un numero
    public getTodoById = (req: Request, res: Response ) => {
        const id = +req.params.id;
        
        if ( isNaN(id) ) return res.status(400).json({ 
            error: 'ID Argument must be a number'
        })

        const todo = todos.find( 
            todo => todo.id === id 
        );
        
        ( todo )
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with id ${id} not found` })
    };

    public createTodo = ( req: Request, res: Response ) => {
        const { text } = req.body;
        
        if ( !text ) return res.status(400).json({ 
            error: 'Text is required' 
        });

        const newTodo = {
            id:     todos.length + 1,
            text:   text,
            completedAt: null
        }

        todos.push( newTodo );
        res.json({ message: newTodo })
    };

    public updateTodo = (req: Request, res: Response ) => {
        const id = +req.params.id;
        
        if ( isNaN(id) ) return res.status(400).json({ 
            error: 'ID Argument must be a number'
        })

        const todo = todos.find(
            todo => todo.id === id
        );
        
        if (!todo) return res.status( 404 ).json({ 
            error: `Todo with id ${id} not found` 
        });
        
        const { text, completedAt } = req.body;
        
        todo.text = text || todo.text; // esto no se hace, la mutacion

        ( completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date( completedAt || todo.completedAt );  // OJO, REFERENCIA
            
        // todos.forEach( (todo, index) => {
        //     if ( todo.id === id ) todos[index] = todo;
        // })

        res.json({ message: todo })
    }

    public deleteTodo = (req: Request, res: Response ) => {
        const id = +req.params.id;

        if ( isNaN(id) ) return res.status(400).json({ 
            error: 'ID Argument must be a number'
        })
        
        const todo = todos.find(
            todo => todo.id === id
        );

        if (!todo) return res.status( 404 ).json({ 
            error: `Todo with id ${id} not found` 
        });

        todos.splice( todos.indexOf(todo), 1 );
        const todoDeleted = todos.find(
            todo => todo.id === id
        );
        
        if (todoDeleted) return res.status( 400 ).json({ 
            error: `Todo with id ${id} not could be deleted` 
        });

        res.json({ 
            message: 'Todo Successfully Deleted', 
            todo
        })
    }
}