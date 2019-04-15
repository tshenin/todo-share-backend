const knex = require('../connection');

const addUser = user =>
    knex('users')
        .insert({
            username: user.username,
            password: user.password,
        })
        .returning('*');


module.exports = {
    addUser
};