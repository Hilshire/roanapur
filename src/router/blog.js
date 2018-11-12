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
        const query = ctx.query;
        ctx.body = await blogService.queryList(query.page, query.length);
        return next();
    } catch(e) {
        logger.error(e);
        ctx.status = 500;
    }
});

router.get('/app/v1/blogs/:id', async (ctx, next) => {
    try {
        ctx.body = await blogService.query(ctx.params.id);
        return next();
    } catch (e) {
        logger.error(e);
        ctx.status = 500;
    }
})

router.post('/app/v1/blogs', async (ctx, next) => {
    try {
        ctx.body = await blogService.create(ctx.request.fields);
        return next();
    } catch (e) {
        logger.error(e);
        ctx.status = 500;
    }
})

router.put('/app/v1/blogs/:id', async (ctx, next) => {
    try {
        ctx.body = await blogService.update(ctx.params.id, ctx.request.fields);
        return next();
    } catch (e) {
        logger.error(e);
        ctx.status = 500;
    }
})

router.delete('app/v1/blogs/:id', async (ctx, next) => {
    try {
        ctx.body = await blogService.delete(ctx.params.id);
        return next();
    } catch (e) {
        logger.error(e);
        ctx.status = 500;
    }
})

router.get('app/v1/blogs/:id/tags', async (ctx, next) => {
    try {
        ctx.body = await blogService.queryTags(ctx.params.id);
        return next();
    } catch (e) {
        logger.error(e);
        ctx.status = 500;
    }
})

router.post('app/v1/blogs/:id/tags', async (ctx, next) => {
    try {
        ctx.body = await blogService.addTag(ctx.params.id, ctx.request.fields.name);
        return next();
    } catch (e) {
        logger.error(e);
        ctx.status = 500;
    }
})

router.delete('app/v1/blogs/:id/:tagId', async (ctx, next) => {
    try {
        ctx.body = await blogService.deleteTag(ctx.params.id, ctx.params.tagId);
        return next();
    } catch (e) {
        logger.error(e);
        ctx.status = 500;
    }
})

module.exports = router;
