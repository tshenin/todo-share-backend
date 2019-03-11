const request = require('supertest');
const server = require('../src/server');
const meta = require('../package.json');

describe('basic test', () => {
    test('get index page', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toContain(meta.version);
    });
});

afterAll(done => {
    server.close(done);
});
