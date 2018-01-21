/*
 * @Author: hilshire
 * @Date: 2018-01-21 13:55:30
 */
let Blog = require("../models").Blog;
let TagArticleService = require('./TagArticle');

module.exports = new TagArticleService(Blog);
