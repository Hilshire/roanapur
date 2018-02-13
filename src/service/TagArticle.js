/*
 * @Author: hilshire
 * @Date: 2018-01-21 13:01:13
 */
const ArticleService = require('./BaseArticle');
const tagService = require('./tag');

module.exports = class TagArticleService extends ArticleService {
    constructor (model) {
        super(model);
    }
    async create(data, tagNames) {
        const newArticle = await super.create(data);
        if (newArticle && tagNames)
            await newArticle.setTags(tagService.safeQueryList(tagNames));
        return newArticle;
    }
    async addTag(id, tagName) {
        this.query(id).addTag(tagService.safeQuery(tagName));
    }
    async addTags(id, tagNames) {
        this.query(id).addTag(tagService.safeQueryList(tagNames));
    }
    queryTags(id) {
        return this.query(id).getTags();
    }
    deleteTag(articleId, tagId) {
        return this.query(articleId).remove(tagService.queryById(tagId));
    }
    deleteAllTags(id) {
        return this.query(id).setTags([]);
    }
}
