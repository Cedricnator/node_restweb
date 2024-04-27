import request  from "supertest"
import { testServer } from "../../test.server"
import { prisma } from "../../../src/data/postgres";
import { error } from "console";

describe('Todo route testing', () => {

    //* levanta el servidor antes de todos los test
    beforeAll( async() => {
        await testServer.start();
    })

    //* Se cierra el servidor, para manejarlo de manera independiente
    afterAll(() => {
        testServer.close();
    })

    //* Antes de cada test, se limpia la base de datos
    beforeEach(async() => {
        await prisma.todo.deleteMany();
    })

    //* Datos para insertar y probar
    const todo1 = { text: 'Hola Mundo 1'}
    const todo2 = { text: 'Hola Mundo 1'}

    test('should return TODOs api/todos ', async() => {
        // Asegurarnos de insertar nuevos elementos
        await prisma.todo.deleteMany();
        await prisma.todo.createMany({
            data: [ todo1, todo2 ] 
        })

        const { body } = await request( testServer.app)
            .get('/api/todos')
            .expect(200)

        expect( body ).toBeInstanceOf( Array );
        expect( body[0].text ).toBe( todo1.text)
        expect( body[1].text ).toBe( todo2.text)
        expect( body[0].completedAt ).toBeNull();
    })

    test('should return a TODO api/todos/:id', async() => {
        const todo = await prisma.todo.create({
            data: todo1
        })

        const { body } = await request( testServer.app )
            .get(`/api/todos/${ todo.id }`)
            .expect(200)
        
       
        expect( body ).toEqual({
            id: todo.id,
            text: todo1.text,
            completedAt: todo.completedAt,
        })
    });

    test('should return a 404 notFound api/todos/:id', async() => {
        const todoId = 99999
        const { body } = await request( testServer.app )
            .get(`/api/todos/${todoId}`)
            .expect(400)
        expect( body ).toEqual({ error: `Todo with id ${ todoId } not found`})
    })
})