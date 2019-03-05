const request = require('supertest');
const server = require('../src/server');
const knex = require('../src/db/connection');

describe('routes: todos', () => {

    beforeEach(async () => {
        await knex.migrate.rollback()
        await knex.migrate.latest()
        await knex.seed.run()
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

    test('get all todos', async () => {
        const response = await request(server)
            .post('/todos')
            .send({ title: "New from test", desc: "New desc" });
        expect(response.status).toEqual(201);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });
});

afterAll(() => {
    server.close();
})