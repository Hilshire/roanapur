module.exports = function (sequelize, DataTypes) {
    return sequelize.define("EssayTag", {
        essay_id: {
            type: DataTypes.INTEGER,
            unique: 'essay_tag'
        },
        tag_id: {
            type: DataTypes.INTEGER,
            unique: 'essay_tag'
        }
    })
};