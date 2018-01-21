/*
 * @Author: hilshire
 * @Date: 2018-01-21 13:55:19
 */
let Essay = require("../models").Essay;
let TagArticleService = require('./TagArticle');

module.exports = new TagArticleService(Essay);
