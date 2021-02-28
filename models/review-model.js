module.exports = function (sequelize, DataTypes) {
    var Review = sequelize.define('Review', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bio: {
            type: DataTypes.STRING,
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

    return Review;
}
