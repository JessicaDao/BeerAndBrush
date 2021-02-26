module.exports = function (sequelize, DataTypes) {
    var Gallery = sequelize.define('Gallery', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        materialUsed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        forSale: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    });
    { timestamps: true }

    return Gallery;
}
