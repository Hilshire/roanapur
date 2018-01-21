/*
 * @Author: hilshire
 * @Date: 2018-01-21 13:55:52
 */
const Tag = require('../models').Tag;

module.exports = class TagService {
    async queryById(id) {
        return await Tag.find({ where: { id } });
    }
    
    async queryByName(name) {
        return await Tag.find({ where: { name }});
    }

    // if exist, return exist tag; if not, create a new one and return it
    async safeQuery(name) {
        let existTag = this.queryByName(name);
        if (existTag) return existTag
            else return this.create(name);
    }

    safeQueryList(nameList) {
        return nameList.map(name => this.safeQuery(name));
    }

    async create(name) {
        if (!Tag.queryByName(name))
            return await Tag.create({ name });
    }

    async createByList(nameList) {
        return nameList.map(name => this.create(name));
    }

    async del(id) {
        return await Tag.destroy({ where: { id } });
    }

    async querySources(id) {
        let tag = await this.queryById(id);
        return Promise.all([
            tag.getBlogs(),
            tag.getEssays(),
            tag.getTips(),
        ])
    }
}
