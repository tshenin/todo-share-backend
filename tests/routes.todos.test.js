const request = require('supertest');
const server = require('../src/server');
const knex = require('../src/db/connection');

describe('routes : todos', () => {

    beforeEach(() => {
        knex.migrate.rollback()
            .then(() => knex.migrate.latest())
            .then(() => knex.seed.run());
    });

    afterEach(() => {
        knex.migrate.rollback();
    });

    test('get all todos', async () => {
        const response = await request(server).get('/todos');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual();

        console.log(response);

    });
});

afterAll(() => {
    server.close();
})