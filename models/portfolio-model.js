module.exports = function (sequelize, DataTypes) {
    var Profile = sequelize.define('Profile', {
        bio: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    { timestamps: true }

    return Profile;
}
