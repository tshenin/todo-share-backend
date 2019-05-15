const passport = require('koa-passport');

const authorize = (ctx) => new Promise((resolve, reject) => {
    passport.authenticate('jwt', async (err, user) => {
        if (err) return reject(err);

        if (user) return resolve(user);

        return reject(null);
    })(ctx);
});

module.exports = {
    authorize
};