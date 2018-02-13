module.exports = function(sequelize, DataTypes) {
    var Blog = sequelize.define("Blog", {
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        content: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        summary: DataTypes.BLOB,
    }, {
        classMethods: {
            associate: models => {
                let Tag = models.Tag;
                Blog.belongsToMany(Tag, { through: models.BlogTag });
                Tag.belongsToMany(Blog, { through: models.BlogTag});
            },
        }
    });

    return Blog;
};