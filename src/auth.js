const passport = require('koa-passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const knex = require('./db/connection');

const options = {};
options.secretOrKey = 'secret';

passport.serializeUser((user, done) => { return done(null, user.id) });

passport.deserializeUser(async (id, done) => {
    try {
        const user = await knex('users').where({ id }).first();
        return done(null, user);
    } catch (err) {
        return done(err, user);
    }
});

passport.use(new JwtStrategy(options, (username, password, done) => {
    knex('users').where({ username }).first()
        .then((user) => {
            if (!user) return done(null, false);
            if (password === user.password) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => { return done(err); });
}));