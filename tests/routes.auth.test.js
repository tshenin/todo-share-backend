const request = require('supertest');
const app = require('../src/app');
const knex = require('../src/db/connection');

let server;
let agent;
beforeAll(done => {
    server = app.listen(4000, err => {
        if (err) return done(err);
        agent = request.agent(server);
        done();
    });
});

describe('routes: auth/register', () => {

    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    });

    afterEach(async () => {
        await knex.migrate.rollback();
    });

    test('register user', async () => {
        const response = await agent.post('/auth/register')
            .send({
                username: 'new',
                password: 'user'
            });
        expect(response.status).toEqual(201);
    });

    // test('login user', async () => {
    //     const response = await agent.post('/auth/login')
    //         .send({
    //             username: 'figaro',
    //             password: 'secretinfo',
    //         });
    //     expect(response.status).toEqual(200);
    // });
});

afterAll(done => {
    server.close(done);
});
