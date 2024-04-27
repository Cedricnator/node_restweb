import request  from "supertest"
import { testServer } from "../../test.server"

describe('Todo route testing', () => {

    //* levanta el servidor antes de todos los test
    beforeAll( async() => {
        await testServer.start();
    })

    afterAll(() => {
        testServer.close();
    })

    test('should return TODOs api/todos ', async() => {
        const response = await request( testServer.app)
            .get('/api/todos')
            .expect(200)
        })
})