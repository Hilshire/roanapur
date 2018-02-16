module.exports = function(sequelize, DataTypes) {
    let Tag = sequelize.define("Tag", {
        name: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
            validate: { notEmpty: true }
        }
    });

    // Tag.associate = models => {
    //     ['Blog', 'Essay', 'Note'].forEach(modelName => {
    //         Tag.belongsToMany(models[modelName], genForeignKey(modelName))
    //     })
    // };

    return Tag;
}

function genForeignKey(modelName) {
    return {
        allowNull: false,
        through: modelName + '_tag'
    };
}
