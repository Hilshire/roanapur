/*
 * @Author: hilshire
 * @Date: 2018-01-21 13:01:13
 */
const ArticleService = require('./Article');
const tagService = require('./Tag')();

module.exports = class TagArticleService {
    constructor (model) {
        super(model);
    }
    async create(data, tagNameList) {
        const newArticle = super.create(data);
        if (newArticle && tagNameList)
            await newArticle.setTags(tagService.safeQueryList);
    }
    async addTag(id, tagName) {
        this.query(id).addTag(tagService.safeQuery(tagName));
    }
    async addTags(id, tagNames) {
        this.query(id).addTags(tagService.safeQueryList(tagNames));
    }
    queryTags(id) {
        return this.queryTags(id).getTags();
    }
    deleteTag(articleId, tagId) {
        return this.queryTags(articleId).remove(tagService.queryById(tagId));
    }
    deleteAllTags(id) {
        return this.queryTags(id).setTags([]);
    }
}
