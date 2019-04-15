const Router = require('koa-router');
const passport = require('koa-passport');
const queries = require('../db/queries/users');

const router = new Router();

router.post('/auth/register', async (ctx) => {
    await queries.addUser(ctx.request.body);
    return passport.authenticate('local', (err, user, info, status) => {
        if (user) {
            ctx.login(user);
            ctx.status = 201;
        } else {
            ctx.status = 400;
            ctx.body = { status: 'error' };
        }
    })(ctx);
});

router.post('/auth/login', (ctx) => {
    return passport.authenticate('local', (err, user, info, status) => {
        if (user) {
            ctx.login(user);
            ctx.status = 200;
        } else {
            ctx.status = 400;
            ctx.body = { status: 'error' };
        }
    })(ctx);
});

module.exports = router;