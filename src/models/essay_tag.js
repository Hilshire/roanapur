module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Essay_tag", {
        essay_id: {
            type: DataTypes.INTEGER,
            unique: 'essay_tag'
        },
        tag_id: {
            type: DataTypes.INTEGER,
            unique: 'essay_tag'
        }
    })
}