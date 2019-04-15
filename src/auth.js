const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('./db/connection');

const options = {};

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = knex('users').where({ id }).first();
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use(new LocalStrategy(options, (username, password, done) => {
    try {
        const user = knex('users').where({ username }).first();

        if (!user) return done(null, false);

        if (password === user.password) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        done(err)
    }
}));