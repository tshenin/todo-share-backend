const knex = require('../connection');

const s = () =>
    knex('users')
        .select('*');


module.exports = {
};