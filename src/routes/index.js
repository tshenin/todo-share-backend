const Router = require('koa-router');
const meta = require('../../package.json');
const router = new Router();

router.get('/', ctx => {
    ctx.body = meta.version
});

module.exports = router;