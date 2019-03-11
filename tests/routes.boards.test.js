const request = require('supertest');
const server = require('../src/server');
const knex = require('../src/db/connection');

describe('routes: boards', () => {

    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    });

    afterEach(async () => {
        await knex.migrate.rollback();
    });

    test('get all boards', async () => {
        const response = await request(server).get('/boards');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });

    test('add new board', async () => {
        const response = await request(server)
            .post('/boards')
            .send({ title: "New from test", desc: "New desc" });
        expect(response.status).toEqual(201);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });

    test('update board', async () => {
        const boards = await knex.select('*').from('boards');
        const board = boards[0];
        const response = await request(server)
            .put(`/boards/${board.id}`)
            .send({ desc: "Updated desc" });
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });

    test('update board: should be an error', async () => {
        const response = await request(server)
            .put('/boards/99999')
            .send({ desc: "Updated desc" });
        expect(response.status).toEqual(404);
    });

    test('delete board', async () => {
        const boards = await knex.select('*').from('boards');
        const board = boards[0];
        const response = await request(server).delete(`/boards/${board.id}`);
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });
});

afterAll(done => {
    server.close(done);
});
