module.exports = function (sequelize, DataTypes) {
    return sequelize.define('About', {
        content: DataTypes.BLOB,
    });
};