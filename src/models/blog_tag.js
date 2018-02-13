module.exports = function (sequelize, DataTypes) {
    return sequelize.define("BlogTag", {
        blog_id: {
            type: DataTypes.INTEGER,
            unique: 'blog_tag',
        },
        tag_id: {
            type: DataTypes.INTEGER,
            unique: 'blog_tag',
        },
    });
};
