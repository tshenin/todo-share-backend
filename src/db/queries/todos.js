const knex = require('../connection');

const getAllTodos = () =>
    knex('todos')
        .select('*');

const getTodoById = id =>
    knex('todos')
        .select('*')
        .where({ id: parseInt(id) });

const addTodo = todo =>
    knex('todos')
        .insert(todo)
        .returning('*');

module.exports = {
    getAllTodos,
    getTodoById,
    addTodo
};