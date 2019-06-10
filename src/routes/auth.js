const Router = require('koa-router');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');

const queries = require('../db/queries/users');
const { auth } = require('../services/auth.service');

const router = new Router();

router.post('/auth/register', async (ctx) => {
    try {
        const [data] = await queries.addUser(ctx.request.body);
        ctx.status = 201;
        ctx.body = {
            status: 'success',
            id: data.id,
            token: jwt.sign({ ...data }, process.env.TOKEN_KEY)
        };
    } catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = { status: 'error', data: err };
    }
});

router.post('/auth/login', (ctx) => {
    return passport.authenticate('local', (err, user) => {
        if (user) {
            const token = jwt.sign(user, process.env.TOKEN_KEY);
            ctx.status = 200;
            ctx.body = { id: user.id, token };
        } else {
            ctx.status = 400;
            ctx.body = { status: 'error' };
        }
    })(ctx);
});

router.get('/auth/status', async ctx => {
    let user;
    try {
        user = await auth(ctx);
    } catch (e) {
        ctx.status = 403;
        ctx.body = e || 'Not Authorized';
        return;
    }

    ctx.status = 200;
    ctx.body = { id: user.id };
});

module.exports = router;