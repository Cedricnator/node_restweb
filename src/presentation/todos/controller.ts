//* El controlador es un mecanismo que permite separar la responsabilidad del router y del controlador
import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';

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

    public getTodos = async(req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        res.json( todos )
    }
    
    //* El operador + convierte un string a un numero
    public getTodoById = async(req: Request, res: Response ) => {
        const id = +req.params.id;
        
        if ( isNaN(id) ) return res.status(400).json({ 
            error: 'ID Argument must be a number'
        })

        const oneTodo = await prisma.todo.findFirst({
            where: { id: id }
        })
    
        const todo = todos.find( 
            todo => todo.id === id 
        );
        
        ( oneTodo )
            ? res.json(oneTodo)
            : res.status(404).json({ error: `Todo with id ${id} not found` })
    };

    public createTodo = async( req: Request, res: Response ) => {
        const { text } = req.body;
        
        if ( !text ) return res.status(400).json({ 
            error: 'Text is required' 
        });

        const todo = await prisma.todo.create({
            data: { text: text }
        });

       
        res.json({ todo })
    };

    public updateTodo = async(req: Request, res: Response ) => {
        const id = +req.params.id;
        
        if ( isNaN(id) ) return res.status(400).json({ 
            error: 'ID Argument must be a number'
        })

        const oneTodo = await prisma.todo.findFirst({
            where: { id: id }
        })
        
        if (!oneTodo) return res.status( 404 ).json({ 
            error: `Todo with id ${id} not found` 
        });
        
        const { text, completedAt } = req.body;

        try {
            const updateTodo = await prisma.todo.update({
                where: { id: id },
                data: { text: text, completedAt: completedAt }
            })
    
            res.json({ message: updateTodo })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Revisar logs del servidor'})
        }
    }

    public deleteTodo = async(req: Request, res: Response ) => {
        const id = +req.params.id;

        if ( isNaN(id) ) return res.status(400).json({ 
            error: 'ID Argument must be a number'
        })
        
        const oneTodo = await prisma.todo.findFirst({
            where: { id: id }
        })

        if (!oneTodo) return res.status( 404 ).json({ 
            error: `Todo with id ${id} not found` 
        });

        await prisma.todo.delete({
            where: { id: id }
        })

        res.json({ 
            message: 'Todo Successfully Deleted'
        })
    }
}