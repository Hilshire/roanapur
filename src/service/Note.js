/*
 * @Author: hilshire
 * @Date: 2018-01-21 13:56:47
 */
let Note = require("../models").Note;
let TagArticleService = require('./TagArticle');

class NoteService extends TagArticleService {
    constructor() {
        super(Note);
    }
    queryList(page, size) {
        return this.model.findAll({
            limit: size,
            offset: (page - 1) * size,
            order: [['createdAt', 'DESC']]
        })
    }
}

module.exports = new NoteService();
