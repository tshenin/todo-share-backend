const Router = require('koa-router');
const query = require('../db/queries/todos');
const { auth } = require('../services/auth.service');

const router = new Router();

/**
 * Get all todos or get all todos for board
 */
router.get('/todos', async ctx => {
    let user;
    try {
        user = await auth(ctx);
    } catch (e) {
        ctx.status = 403;
        ctx.body = e || 'Not Authorized';
    }
    let todos = [];

    try {
        const { board } = ctx.query;
        if (board) {
            todos = await query.getTodosByBoardId(user.id, board);
        } else {
            todos = await query.getAllTodos(user.id);
        }
        ctx.body = {
            status: 'success',
            data: todos
        };
    } catch (e) {
        console.error(e);
    }
});

/**
 * Get todo by id
 */
router.get('/todos/:id', async ctx => {
    let user;
    try {
        user = await auth(ctx);
    } catch (e) {
        ctx.status = 403;
        ctx.body = e || 'Not Authorized';
    }

    try {
        const { id } = ctx.params;
        const todo = await query.getTodoById(id);
        if (todo.length) {
            ctx.body = {
                status: 'success',
                data: todo
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: `No board with id=${id}`,
            };
        }
    } catch (e) {
        console.error(e);
    }
});

/**
 * Create new todo
 */
router.post('/todos', async ctx => {
    let user;
    try {
        user = await auth(ctx);
        ctx.state.user = user;
        next();
    } catch (e) {
        ctx.status = 403;
        ctx.body = e || 'Not Authorized';
    }

    try {
        const { body } = ctx.request;
        const res = await query.addTodo(user.id, body);
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
 * Update todo
 */
router.put('/todos/:id', async ctx => {
    let user;
    try {
        user = await auth(ctx);
        ctx.state.user = user;
        next();
    } catch (e) {
        ctx.status = 403;
        ctx.body = e || 'Not Authorized';
    }

    try {
        const { id } = ctx.params;
        const { body } = ctx.request;
        const res = await query.updateTodo(user.id, id, body);
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
 * Delete todo
 */
router.delete('/todos/:id', async ctx => {
    let user;
    try {
        user = await auth(ctx);
        ctx.state.user = user;
        next();
    } catch (e) {
        ctx.status = 403;
        ctx.body = e || 'Not Authorized';
    }

    try {
        const { id } = ctx.params;
        const res = await query.deleteTodo(id);
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