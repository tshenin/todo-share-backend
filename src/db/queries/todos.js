const knex = require('../connection');

const getAllTodos = user_id => {
    const sub = knex('boards')
        .select('id')
        .where({ user_id });

    return knex('todos')
        .select('*')
        .whereIn('board_id', sub);
}

const getTodoById = (user_id, id) => {
    const sub = knex('boards')
        .select('id')
        .where({ id, user_id });

    return knex('todos')
        .select('*')
        .whereIn('board_id', sub)
        .where({ id: parseInt(id) });
}

const addTodo = (user_id, todo) => {
    return knex('todos')
        .insert(todo)
        .returning('*');
}

const updateTodo = (user_id, id, data) =>
    knex('todos')
        .update(data)
        .where({ id: parseInt(id) })
        .returning('*');

const deleteTodo = (user_id, id) => {
    return knex('todos')
        .del()
        .where({ id: parseInt(id) })
        .returning('*');
}


const getTodosByBoardId = (user_id, id) => {
    const sub = knex('boards')
        .select('id')
        .where({ id, user_id });

    return knex('todos')
        .select('*')
        .whereIn('board_id', sub);
}

module.exports = {
    getAllTodos,
    getTodoById,
    addTodo,
    updateTodo,
    deleteTodo,
    getTodosByBoardId,
};