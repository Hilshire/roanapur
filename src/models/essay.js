module.exports = function(sequelize, DataTypes) {
    let Essay = sequelize.define("Essay", {
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        content: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
    }, {
        classMethods: {
            associate: models => {
                let Tag = models.Tag;
                Essay.belongsToMany(Tag, { through: models.EssayTag });
                Tag.belongsToMany(Essay, { through: models.EssayTag});
            }
        }
    });

    return Essay;
};