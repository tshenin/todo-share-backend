const request = require('supertest');
const app = require('../src/app');
const meta = require('../package.json');

let server;
let agent;
beforeAll(done => {
    server = app.listen(4000, err => {
        if (err) return done(err);
        agent = request.agent(server);
        done();
    });
});

describe('basic test', () => {
    test('get index page', async () => {
        const response = await agent.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toContain(meta.version);
    });
});

afterAll(done => {
    server.close(done);
});
