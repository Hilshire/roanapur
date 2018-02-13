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
    }, {
        classMethods: {              
            associate: models => {
                let Tag = models.Tag;
                Note.belongsToMany(Tag, { through: models.EssayTag });
                Tag.belongsToMany(Note, { through: models.EssayTag});
            }
        }
    })

    return Note
}