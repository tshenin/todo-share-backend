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

describe('routes: auth', () => {

    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    });

    afterEach(async () => {
        await knex.migrate.rollback();
    });

    test('get register route', async () => {
        const response = await agent.get('/auth/register');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('text/plain');
    });
});

afterAll(done => {
    server.close(done);
});
