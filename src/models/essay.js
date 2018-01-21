module.exports = function(sequelize, DataTypes) {
    let Essay = sequelize.define("Essay", {
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
                Essay.belongsToMany(Tag, { through: models.Essay_tag })
                Tag.belongsToMany(Essay, { through: models.Essay_tag})
            }
        }
    })

    return Essay
}