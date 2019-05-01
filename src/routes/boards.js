const Router = require('koa-router');

const query = require('../db/queries/boards');
const { authorize } = require('../services/auth.service');
const router = new Router();

/**
 * Get all boards
 */
router.get('/boards', async ctx => {
    let user;
    try {
        user = await authorize(ctx);
    } catch (e) {
        ctx.status = 403;
        ctx.body = e || 'Not Authorized';
        return;
    }

    try {
        const boards = await query.getAllBoards(user.id);
        ctx.status = 200;
        ctx.body = {
            status: 'success',
            data: boards
        };
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            status: 'error',
            message: e.message || 'Server error',
        };
    }
});

/**
 * Get board by id
 */
router.get('/boards/:id', async ctx => {
    let user;
    try {
        user = await authorize(ctx);
    } catch (e) {
        ctx.status = 403;
        ctx.body = e || 'Not Authorized';
        return;
    }

    try {
        const { id } = ctx.params;
        const board = await query.getBoardById(user.id, id);
        if (board.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: board
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: e.message || `No todo with id=${id}`,
            };
        }
    } catch (e) {
        console.error(e);
    }
});

/**
 * Create new board
 */
router.post('/boards', async ctx => {
    let user;
    try {
        user = await authorize(ctx);
    } catch (e) {
        ctx.status = 403;
        ctx.body = e || 'Not Authorized';
        return;
    }

    try {
        const { body } = ctx.request;
        const res = await query.addBoard(user.id, body);
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
router.put('/boards/:id', async ctx => {
    let user;
    try {
        user = await authorize(ctx);
    } catch (e) {
        ctx.status = 403;
        ctx.body = e || 'Not Authorized';
        return;
    }

    try {
        const { id } = ctx.params;
        const { body } = ctx.request;
        const res = await query.updateBoard(user.id, id, body);
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
router.delete('/boards/:id', async ctx => {
    let user;
    try {
        user = await authorize(ctx);
    } catch (e) {
        ctx.status = 403;
        ctx.body = e || 'Not Authorized';
        return;
    }

    try {
        const { id } = ctx.params;
        const res = await query.deleteBoard(user.id, id);
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