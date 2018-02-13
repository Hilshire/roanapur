module.exports = function (sequelize, DataTypes) {
    let banner = sequelize.define('Banner', {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return banner;
};