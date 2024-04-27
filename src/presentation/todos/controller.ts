//* El controlador es un mecanismo que permite separar la responsabilidad del router y del controlador
import { Request, Response } from 'express';

export class TodosController {

    //* DI, aca vamos a querer inyectar nuestro repositorios y nuestras rutas usen ese repositorio
    //* Mejor aun. inyectar el repositorio para implementar y usarlo mediante casos de uso
    constructor(){}

    public getTodos = (req: Request, res: Response) => {
        res.json([
            { id: 1, text: 'Buy milk', createdAt: new Date() },
            { id: 2, text: 'Buy bread', createdAt: new Date() },
            { id: 3, text: 'Buy cheese', createdAt: new Date() },
            { id: 4, text: 'Buy butter', createdAt: new Date() },
        ])
    }
}