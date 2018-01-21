/*
 * @Author: hilshire
 * @Date: 2018-01-21 13:50:44
 */
const About = require("../models").About;

module.exports = class About {
    async create (data) {
        return await About.create(data);
    }

    async query () {
        return await About.findAll({
            limit: 1,
            order: [['createdAt', 'DESC']]
        })[0];
    }
}
