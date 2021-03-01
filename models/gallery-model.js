module.exports = function (sequelize, DataTypes) {
    var Gallery = sequelize.define('Gallery', {

        datePosted: DataTypes.DATE

    });
    { timestamps: true }

    Gallery.associate = function (models) {
        Gallery.belongsTo(models.Project);
    };

    return Gallery;
}
