module.exports = function (sequelize, DataTypes) {
    let About = sequelize.define('About', {
        content: DataTypes.BLOB
    })

    return About
}