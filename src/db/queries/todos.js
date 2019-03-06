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

const updateTodo = (id, data) =>
    knex('todos')
        .update(data)
        .where({ id: parseInt(id) })
        .returning('*');

const deleteTodo = id =>
    knex('todos')
        .del()
        .where({ id: parseInt(id) })
        .returning('*');

module.exports = {
    getAllTodos,
    getTodoById,
    addTodo,
    updateTodo,
    deleteTodo,
};