module.exports = function(sequelize, DataTypes) {
    var Blog = sequelize.define("Blog", {
        title: {
            type: DataTypes.STRING(30),
            notNull: true
        },
        content: {
            type: DataTypes.BLOB,
            notNull: true
        },
        summary: DataTypes.BLOB
    }, {
        classMethods: {
            associate: models => {
                let Tag = models.Tag
                Blog.belongsToMany(Tag, { through: models.Blog_tag })
                Tag.belongsToMany(Blog, { through: models.Blog_tag})
            }
        }
    })

    return Blog
}