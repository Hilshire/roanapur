/*
 * @Author: hilshire
 * @Date: 2018-01-21 13:55:52
 */
const Tag = require('../models').Tag;

class TagService {
    query(idOrName) {
        if (typeof idOrName === 'number') return this.queryById(idOrName)
        else if (typeof idOrName === 'string') return this.queryByName(idOrName);
    }

    async queryById(id) {
        return await Tag.find({ where: { id } });
    }
    
    async queryByName(name) {
        return await Tag.find({ where: { name }});
    }

    async queryAll() {
        return await Tag.findAll({ order: [['createdAt', 'DESC']] });
    }

    // if exist, return exist tag; if not, create a new one and return it
    async safeQuery(name) {
        let existTag = await this.queryByName(name);
        if (existTag) return existTag
            else return await this.create(name);
    }

    safeQueryList(names) {
        return Promise.all(names.map(async name => await this.safeQuery(name)));
    }

    async create(name) {
        return await Tag.create({ name });
    }

    createByList(names) {
        return Promise.all(names.map(name => this.create(name)));
    }

    async delete(id) {
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

module.exports = new TagService();
