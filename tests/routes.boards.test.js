const request = require('supertest');
const app = require('../src/app');
const knex = require('../src/db/connection');

let token;
let userId;
let server;
let agent;
beforeAll(done => {
    server = app.listen(4000, err => {
        if (err) return done(err);
        agent = request.agent(server);
        done();
    });
});

describe('routes: boards', () => {

    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();

        const response = await agent.post('/auth/login')
            .send({ username: 'figaro', password: 'secretinfo' })
        token = response.body.token;
        userId = response.body.id;
    });

    afterEach(async () => {
        await knex.migrate.rollback();
    });

    test('get all boards', async () => {
        const response = await agent.get('/boards');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });

    test('add new board', async () => {
        const response = await agent.post('/boards')
            .send({
                title: 'New from test',
                desc: 'New desc',
                user_id: userId
            });
        expect(response.status).toEqual(201);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });

    test('update board', async () => {
        const boards = await knex.select('*').from('boards');
        const board = boards[0];
        const response = await agent.put(`/boards/${board.id}`)
            .send({ desc: 'Updated desc' });
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });

    test('update board: should be an error', async () => {
        const response = await agent.put('/boards/99999')
            .send({ desc: 'Updated desc' });
        expect(response.status).toEqual(404);
    });
});

afterAll(done => {
    server.close(done);
});
