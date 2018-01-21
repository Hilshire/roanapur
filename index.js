/*
 * @Author: hilshire
 * @Date: 2018-01-21 09:52:31
 */
const koa = require('koa');
const bodyParse = require('koa-better-body');
const router = require('koa-better-router')().loadMethods();

const app = new koa();

app.use(async ctx => {
	ctx.body = 'hello world';
});

app.listen(3000);
