module.exports = function(sequelize, DataTypes) {
    let Tag = sequelize.define("Tag", {
        text: {
            type: DataTypes.STRING(15),
            notNull: true,
            unique: true
        }
    }, {
        classMethods: {              
            associate: models => {
                ['Blog', 'Essay', 'Note'].forEach(modelName => {
                    Tag.belongsToMany(models[modelName], genForeignKey(modelName))
                })
            }
        }
    })

    return Tag
}

function genForeignKey(modelName) {
    return {
        allowNull: false,
        through: modelName + '_tag'
    }
}
