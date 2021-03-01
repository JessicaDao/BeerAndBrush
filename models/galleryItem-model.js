module.exports = function (sequelize, DataTypes) {
    var GalleryItem = sequelize.define('GalleryItem', {

        datePosted: DataTypes.DATE

    });
    { timestamps: true }

    GalleryItem.associate = function (models) {
        GalleryItem.belongsTo(models.Project);
    };

    return GalleryItem;
}
