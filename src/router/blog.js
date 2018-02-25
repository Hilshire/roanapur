/*
 * @Author: hilshire
 * @Date: 2018-02-25 11:52:56
 */
const Router = require('koa-better-router');
const blogService = require('../service/Blog');
const logger = require('../utils/log').getLogger('error');

const router = Router().loadMethods();

router.get('/app/v1/blogs', async (ctx, next) => {
    try {
        ctx.body = await blogService.queryList();
        return next();
    } catch(e) {
        logger.error(e);
        ctx.status = 500;
    }
});

router.get('/app/v1/blogs/:id', (ctx, next) => {
    try {
        ctx.body = blogService.query(ctx.query.id);
        return next();
    } catch (e) {
        logger.error(e);
        ctx.status = 500;
    }
})

router.post('/app/v1/blogs', (ctx, next) => {
    try {
        ctx.body = blogService.create(ctx.body);
        return next();
    } catch (e) {
        logger.error(e);
        ctx.status = 500;
    }
})

module.exports = router;
