const knex = require('../connection');

const getAllTodos = () => {
    return knex('todos').select('*');
};

module.exports = {
    getAllTodos
};