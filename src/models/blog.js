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
    });

    Blog.associate = models => {
        let Tag = models.Tag;
        Blog.belongsToMany(Tag, {
            through: models.BlogTag,
            foreignKey: 'blog_id'
        });
        Tag.belongsToMany(Blog, {
            through: models.BlogTag,
            foreignKey: 'tag_id'
        });
    };

    return Blog;
};
