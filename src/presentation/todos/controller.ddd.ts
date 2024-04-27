//* El controlador es un mecanismo que permite separar la responsabilidad del router y del controlador
import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain';

export class TodosController {

    //* DI, aca vamos a querer inyectar nuestro repositorios y nuestras rutas usen ese repositorio
    //* Mejor aun. inyectar el repositorio para implementar y usarlo mediante casos de uso
    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    public getTodos = async(req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        return res.json( todos )
    }
    
    //* El operador + convierte un string a un numero
    public getTodoById = async(req: Request, res: Response ) => {
        const id = +req.params.id;
        
        try {
            const todo = await this.todoRepository.findById(id);
            return res.json(todo);

        } catch (error) {
            res.status(400).json({ error })
        }

    };

    public createTodo = async( req: Request, res: Response ) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if( error ) return res.status(400).json({ error });

        const todo = await this.todoRepository.create( createTodoDto!);
        return res.json({ todo })
    };

    public updateTodo = async(req: Request, res: Response ) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id});
        if( error ) return res.status(400).json({ error });

        const updateTodo = await this.todoRepository.updateById(updateTodoDto!);
        res.json({ updateTodo });
    };

    public deleteTodo = async(req: Request, res: Response ) => {
        const id = +req.params.id;
        try {
            const deletedTodo = await this.todoRepository.deleteById(id);
            res.json( deletedTodo );
        } catch (error) {
            console.log(error);
        }
    };
}