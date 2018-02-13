/*
 * @Author: hilshire
 * @Date: 2018-01-21 13:52:15
 */
const Banner = require("../models").Banner;

class BannerService {
    async create(data) {
        return await Banner.create(data);
    }
    async delete(id) {
        return await Banner.destroy({
            where: { id: id }
        });
    }
    async update(id, data) {
        return await Banner.update(data, {
            where: { id: id }
        });
    }
    async queryList(page = 1, size = 10) {
        return await Banner.findAll({
            limit: size,
            offset: (page - 1) * size,
            order: [['createdAt', 'DESC']]
        })
    }
}

module.exports = new BannerService();
