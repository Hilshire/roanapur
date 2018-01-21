module.exports = function (sequelize, DataTypes) {
    let Note = sequelize.define('Note', {
        title: {
            type: DataTypes.STRING(30),
            notNull: true
        },
        content: {
            type: DataTypes.BLOB,
            notNull: true
        }
    }, {
        classMethods: {              
            associate: models => {
                let Tag = models.Tag
                Note.belongsToMany(Tag, { through: models.Note_tag })
                Tag.belongsToMany(Note, { through: models.Note_tag})
            }
        }
    })

    return Note
}