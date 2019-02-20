const request = require('supertest');
const server = require('../server');

describe('basic test', () => {
    test('get index page', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('1.0.0');
    });
});

afterAll(() => {
    server.close();
})