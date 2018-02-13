/*
 * @Author: hilshire
 * @Date: 2018-01-21 12:51:12
 */
module.exports = class BaseArticleService {
    constructor (model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async delete(id) {
        return await this.model.destroy({
            where: { id },
        });
    }

    async update(id, data) {
        return await this.model.update({
            where: { id },
        })
    }

    async queryList(page = 1, size = 5) {
        return await this.model.findAll({
            attributes: { exclude: ['content'] },
            limit: size,
            offset: (page - 1) * size,
            order: [['createdAt', 'DESC']],
        })
    }

    async query(id) {
        return await this.model.find({
            where: { id },
        })
    }

    async length() { return this.model.count() }
}
