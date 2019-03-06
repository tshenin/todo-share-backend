const knex = require('../connection');

const getAllBoards = () =>
    knex('boards')
        .select('*');

const getBoardById = id =>
    knex('boards')
        .select('*')
        .where({ id: parseInt(id) });

const addBoard = board =>
    knex('boards')
        .insert(board)
        .returning('*');

const updateBoard = (id, data) =>
    knex('boards')
        .update(data)
        .where({ id: parseInt(id) })
        .returning('*');

const deleteBoard = id =>
    knex('boards')
        .del()
        .where({ id: parseInt(id) })
        .returning('*');

module.exports = {
    getAllBoards,
    getBoardById,
    addBoard,
    updateBoard,
    deleteBoard,
};