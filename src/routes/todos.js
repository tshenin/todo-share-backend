const Router = require('koa-router');
const query = require('../db/queries/todos');
const router = new Router();
const BASE_URL = '/todos';

router.get(BASE_URL, ctx => {
    try {
        const todos = query.getAllTodos();
        ctx.body = {
            status: 'success',
            data: todos
        };
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;