module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Note_tag", {
        note_id: {
            type: DataTypes.INTEGER,
            unique: 'note_tag'
        },
        tag_id: {
            type: DataTypes.INTEGER,
            unique: 'note_tag'
        }
    })
}