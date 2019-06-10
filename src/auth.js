const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');

const knex = require('./db/connection');

const localStrategyOptions = { session: false };
const jwtStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_KEY,
};


passport.serializeUser((user, done) => { return done(null, user.id) });

passport.deserializeUser(async (id, done) => {
    try {
        const user = await knex('users').where({ id }).first();
        return done(null, user);
    } catch (err) {
        return done(err, user);
    }
});

passport.use(new LocalStrategy(localStrategyOptions, (username, password, done) => {
    knex('users').where({ username }).first()
        .then((user) => {
            if (!user) return done(null, false);
            if (!comparePass(password, user.password)) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        })
        .catch((err) => { return done(err); });
}));

passport.use(new JwtStrategy(jwtStrategyOptions, (jwtPayload, done) => {
    knex('users').where({ id: jwtPayload.id }).first()
        .then((user) => {
            if (!user) return done(null, false);

            return done(null, user);
        })
        .catch((err) => { return done(err); });
}));

const comparePass = (userPassword, databasePassword) => {
    return bcrypt.compareSync(userPassword, databasePassword);
}