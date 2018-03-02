/*
 * @Author: hilshire
 * @Date: 2018-02-25 10:56:17
 */
const app = require('./src/app');
const model = require('./src/models');

model.sequelize.sync();
module.exports = app.listen(3000);
