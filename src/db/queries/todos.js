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

const addTodo = async (user_id, todo) => {
    const board = await knex('boards')
        .select('*')
        .where({ user_id, id: todo.board_id });

    if (board.length) {
        return knex('todos')
            .insert(todo)
            .returning('*');
    }
    return await false;
}

const updateTodo = async (user_id, id, data) => {
    const sub = knex('boards')
        .select('id')
        .where({ user_id });

    return knex('todos')
        .update(data)
        .whereIn('board_id', sub)
        .where({ id })
        .returning('*');
}


const deleteTodo = (user_id, id) => {
    const sub = knex('boards')
        .select('id')
        .where({ user_id });

    return knex('todos')
        .del()
        .whereIn('board_id', sub)
        .where({ id })
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