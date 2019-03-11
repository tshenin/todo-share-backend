const Router = require('koa-router');
const query = require('../db/queries/boards');
const router = new Router();
const BASE_URL = '/boards';

/**
 * Get all boards
 */
router.get(BASE_URL, async ctx => {
    try {
        const boards = await query.getAllBoards();
        ctx.body = {
            status: 'success',
            data: boards
        };
    } catch (e) {
        console.error(e);
    }
});

/**
 * Get board by id
 */
router.get(`${BASE_URL}/:id`, async ctx => {
    try {
        const { id } = ctx.params;
        const board = await query.getBoardById(id);
        if (board.length) {
            ctx.body = {
                status: 'success',
                data: board
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: `No todo with id=${id}`,
            };
        }
    } catch (e) {
        console.error(e);
    }
});

/**
 * Create new board
 */
router.post(`${BASE_URL}`, async ctx => {
    try {
        const { body } = ctx.request;
        const res = await query.addBoard(body);
        if (res.length) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: res,
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            };
        }
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: e.message || 'Sorry, an error has occurred.'
        };
    }
});

/**
 * Update board
 */
router.put(`${BASE_URL}/:id`, async ctx => {
    try {
        const { id } = ctx.params;
        const { body } = ctx.request;
        const res = await query.updateBoard(id, body);
        if (res.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: res,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            };
        }
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: e.message || 'Sorry, an error has occurred.'
        };
    }
});

/**
 * Delete board
 */
router.delete(`${BASE_URL}/:id`, async ctx => {
    try {
        const { id } = ctx.params;
        const res = await query.deleteBoard(id);
        if (res.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: res,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            };
        }
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: e.message || 'Sorry, an error has occurred.'
        };
    }
});

module.exports = router;