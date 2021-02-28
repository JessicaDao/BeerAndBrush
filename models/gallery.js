module.exports = function (sequelize, DataTypes) {
    var Gallery = sequelize.define('Gallery', {
        class: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Galleryer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
    Gallery.associate = function (models) {
        Gallery.belongsTo(models.User);

    };
    return Gallery;
}

