const Router = require('koa-router');
const query = require('../db/queries/todos');
const router = new Router();
const BASE_URL = '/todos';

router.get(BASE_URL, async ctx => {
    try {
        const todos = await query.getAllTodos();
        ctx.body = {
            status: 'success',
            data: todos
        };
    } catch (e) {
        console.error(e);
    }
});

router.get(`${BASE_URL}/:id`, async ctx => {
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
                message: `No movie with id=${id}`,
            };
        }
    } catch (e) {
        console.error(e);
    }
});

router.post(`${BASE_URL}`, async ctx => {
    try {
        const { body } = ctx.request;
        const res = await query.addTodo(body);
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

router.put(`${BASE_URL}/:id`, async ctx => {
    try {
        const { id } = ctx.params;
        const { body } = ctx.request;
        const res = await query.updateTodo(id, body);
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