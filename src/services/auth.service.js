const passport = require('koa-passport');

const authUser = () => async (ctx, next) => {
    try {
        let user = await auth(ctx);
        ctx.state.user = user;
        next();
    } catch (e) {
        ctx.status = 403;
        ctx.body = e || 'Not Authorized';
    }
}

const auth = async ctx => new Promise((resolve, reject) => {
    passport.authenticate('jwt', async (err, user) => {
        if (err) return reject(err);

        if (user) return resolve(user);

        return reject(null);
    })(ctx);
});

module.exports = {
    authUser,
    auth,
};