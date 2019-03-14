require('@babel/register');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const indexRoutes = require('./routes/index');
const todosRoutes = require('./routes/todos');
const boardsRoutes = require('./routes/boards')

const app = new Koa();

app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(todosRoutes.routes());
app.use(boardsRoutes.routes());

module.exports = app;