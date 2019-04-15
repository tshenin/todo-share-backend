const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
const queries = require('../db/queries/users');

const router = new Router();

router.get('/auth/register', async (ctx) => {
    ctx.body = '';
});

module.exports = router;