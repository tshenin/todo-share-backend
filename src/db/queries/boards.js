const knex = require('../connection');

const getAllBoards = user_id =>
    knex('boards')
        .select('*')
        .where({ user_id });

const getBoardById = (user_id, id) =>
    knex('boards')
        .select('*')
        .where({ id: parseInt(id), user_id });

const addBoard = (user_id, board) =>
    knex('boards')
        .insert(board)
        .where({ user_id })
        .returning('*');

const updateBoard = (user_id, id, data) =>
    knex('boards')
        .update(data)
        .where({ id: parseInt(id), user_id })
        .returning('*');

const deleteBoard = (user_id, id) =>
    knex('boards')
        .del()
        .where({ id: parseInt(id), user_id })
        .returning('*');

module.exports = {
    getAllBoards,
    getBoardById,
    addBoard,
    updateBoard,
    deleteBoard,
};