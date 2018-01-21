module.exports = function (sequelize, DataTypes) {
    let Banner = sequelize.define('Banner', {
        content: {
            type: DataTypes.STRING,
            notNull: true
        }
    })

    return Banner
}