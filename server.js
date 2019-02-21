require('@babel/register');

const Koa = require('koa');
const router = require('./routes/basic');
const app = new Koa();
const PORT = 3000;

app.use(router.routes());
app.use(router.allowedMethods());
const server = app.listen(PORT);

module.exports = server;