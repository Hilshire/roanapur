module.exports = function (sequelize, DataTypes) {
    let Note = sequelize.define('Note', {
        title: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        content: {
            type: DataTypes.BLOB,
            allowNull: false
        }
    });

    Note.associate = models => {
        let Tag = models.Tag;
        Note.belongsToMany(Tag, {
            through: models.EssayTag,
            foreignKey: 'note_id'
        });
        Tag.belongsToMany(Note, {
            through: models.EssayTag,
            foreignKey: 'tag_id'
        });
    };

    return Note;
}
