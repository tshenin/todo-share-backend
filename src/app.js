require('@babel/register');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const indexRoutes = require('./routes/index');
const todosRoutes = require('./routes/todos');
const boardsRoutes = require('./routes/boards');
const authRoutes = require('./routes/auth');

const app = new Koa();

app.use(bodyParser());

// authentication
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(indexRoutes.routes());
app.use(todosRoutes.routes());
app.use(boardsRoutes.routes());
app.use(authRoutes.routes());

module.exports = app;