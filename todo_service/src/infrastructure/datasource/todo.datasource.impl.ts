import { prisma } from "../../data/postgresDB";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDataSourceImpl implements TodoDataSource {
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const createTodo = await prisma.todo.create({
            data: createTodoDto!
        })
        return TodoEntity.fromObject(createTodo);
    }
    
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map( todo => TodoEntity.fromObject(todo) );
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if(!todo) throw `Todo with id ${ id } not found`
        return TodoEntity.fromObject(todo);
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.findById( updateTodoDto.id );
        const updateTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObject(updateTodo);
    }

    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById( id );
        const deleted = await prisma.todo.delete({
            where: { id }
        });
        return TodoEntity.fromObject(deleted);
    }

}