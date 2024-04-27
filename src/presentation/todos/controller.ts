//* El controlador es un mecanismo que permite separar la responsabilidad del router y del controlador
import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';

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
        });
    
        ( oneTodo )
            ? res.json(oneTodo)
            : res.status(404).json({ error: `Todo with id ${id} not found` })
    };

    public createTodo = async( req: Request, res: Response ) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if( error ) return res.status(400).json({ error });

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

       
        res.json({ todo })
    };

    public updateTodo = async(req: Request, res: Response ) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id});
        if( error ) return res.status(400).json({ error });
        
        const oneTodo = await prisma.todo.findFirst({
            where: { id: id }
        })
        
        if (!oneTodo) return res.status( 404 ).json({ 
            error: `Todo with id ${id} not found` 
        });
        
        try {
            const updateTodo = await prisma.todo.update({
                where: { id: id },
                data: updateTodoDto!.values
            });
    
            res.json({ message: updateTodo });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Revisar logs del servidor'});
        }
    };

    public deleteTodo = async(req: Request, res: Response ) => {
        const id = +req.params.id;

        if ( isNaN(id) ) return res.status(400).json({ 
            error: 'ID Argument must be a number'
        });
        
        const oneTodo = await prisma.todo.findFirst({
            where: { id: id }
        });

        if (!oneTodo) return res.status( 404 ).json({ 
            error: `Todo with id ${id} not found` 
        });

        const deleted = await prisma.todo.delete({
            where: { id: id }
        });

        ( deleted )
            ? res.json( deleted )
            : res.status(400).json({ error: `Todo with id ${id} not found` })
    };
}