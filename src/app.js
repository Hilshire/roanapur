/*
 * @Author: hilshire
 * @Date: 2018-01-21 09:52:31
 */
const koa = require('koa');
const bodyParse = require('koa-better-body');
const router = require('koa-better-router')().loadMethods();
const session = require('koa-session');

// router
const blogRouter = require('./router/blog')

const app = new koa();

// set cookie key
app.keys = ['cookie', 'keyGrip'];

// set session, use default config
app.use(session(app));
app.use(bodyParse());

// router
app.use(blogRouter.middleware());

// app.use(async ctx => {});

module.exports = app;
