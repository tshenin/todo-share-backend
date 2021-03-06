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

describe('routes: todos', () => {

    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();

        const login = await agent.post('/auth/login')
            .send({ username: 'figaro', password: 'secretinfo' });
        token = login.body.token;
        userId = login.body.id;
    });

    afterEach(async () => {
        await knex.migrate.rollback();
    });

    test('get all todos', async () => {
        const response = await agent.get('/todos')
            .set('Authorization', `bearer ${token}`);

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });

    test('get todo by board id', async () => {
        const response = await agent.get('/todos?board=1')
            .set('Authorization', `bearer ${token}`);

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });

    test('add new todo', async () => {
        const boards = await agent.get('/boards')
            .set('Authorization', `bearer ${token}`);

        let board = boards.body.data[0];
        const response = await agent.post('/todos')
            .set('Authorization', `bearer ${token}`)
            .send({
                title: 'New from test',
                desc: 'New desc',
                board_id: board.id
            });

        expect(response.status).toEqual(201);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });

    test('update todo', async () => {
        const todos = await agent.get('/todos')
            .set('Authorization', `bearer ${token}`);

        const todo = todos.body.data[0];
        const response = await agent.put(`/todos/${todo.id}`)
            .set('Authorization', `bearer ${token}`)
            .send({ desc: 'Updated desc' });

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.status).toEqual('success');
    });

    test('update todo: should be an error', async () => {
        const response = await agent.put('/todos/99999')
            .set('Authorization', `bearer ${token}`)
            .send({ desc: 'Updated desc' });
        expect(response.status).toEqual(404);
    });
});

afterAll(done => {
    server.close(done);
});
