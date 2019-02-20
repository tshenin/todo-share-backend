require('@babel/register');

const Koa = require('koa');
const Router = require('koa-router');
const meta = require('./package.json');
const app = new Koa();
const router = new Router();
const PORT = 3000;

router.get('/', ctx => ctx.body = meta.version);

app.use(router.routes());
app.use(router.allowedMethods());
const server = app.listen(PORT);

module.exports = server;