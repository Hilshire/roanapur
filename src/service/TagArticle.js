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
            await newArticle.setTags(await tagService.safeQueryList(tagNames));
        return newArticle;
    }
    async addTag(id, tagName) {
        return await (await this.query(id)).addTag(await tagService.safeQuery(tagName));
    }
    async addTags(id, tagNames) {
        return await (await this.query(id)).addTag(await tagService.safeQueryList(tagNames));
    }
    async queryTags(id) {
        return await (await this.query(id)).getTags();
    }
    async deleteTag(articleId, tagId) {
        return await (await this.query(articleId)).remove(await tagService.queryById(tagId));
    }
    async deleteAllTags(id) {
        return await (await this.query(id)).setTags([]);
    }
}
