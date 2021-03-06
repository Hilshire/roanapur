/*
 * @Author: hilshire
 * @Date: 2018-01-21 13:56:47
 */
let Tip = require("../models").Tip;
let TagArticleService = require('./TagArticle');

class TipService extends TagArticleService {
    queryList(page, size) {
        return this.model.findAll({
            limit: size,
            offset: (page - 1) * size,
            order: [['createdAt', 'DESC']]
        })
    }
}

module.exports = new TipService();
