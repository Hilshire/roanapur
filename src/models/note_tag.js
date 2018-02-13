module.exports = function (sequelize, DataTypes) {
    return sequelize.define("NoteTag", {
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