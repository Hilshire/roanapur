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
    });

    Essay.associate = models => {
        let Tag = models.Tag;
        Essay.belongsToMany(Tag, {
            through: models.EssayTag,
            foreignKey: 'tag_id'
        });
        Tag.belongsToMany(Essay, {
            through: models.EssayTag,
            foreignKey: 'essay_id'
        });
    };

    return Essay;
};
