const request = require('supertest');
const server = require('../src/server');
const knex = require('../src/db/connection');

describe('routes: todos', () => {

    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    });

    afterEach(async () => {
        await knex.migrate.rollback();
    });

    test('get all todos', async () => {
        const response = await request(server).get('/todos');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });

    test('add new todo', async () => {
        const response = await request(server)
            .post('/todos')
            .send({ title: "New from test", desc: "New desc" });
        expect(response.status).toEqual(201);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });

    test('update todo', async () => {
        const todos = await knex.select('*').from('todos');
        const todo = todos[0];
        const response = await request(server)
            .put(`/todos/${todo.id}`)
            .send({ desc: "Updated desc" });
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });

    test('update todo: should be an error', async () => {
        const response = await request(server)
            .put('/todos/99999')
            .send({ desc: "Updated desc" });
        expect(response.status).toEqual(404);
    });

    test('delete todo', async () => {
        const todos = await knex.select('*').from('todos');
        const todo = todos[0];
        const response = await request(server).delete(`/todos/${todo.id}`);
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });
});

afterAll(() => {
    server.close();
})