module.exports = function (sequelize, DataTypes) {
    var Profile = sequelize.define('Profile', {
        bio: {
            type: DataTypes.VARCHAR,
            allowNull: false
        }
    });
    { timestamps: true }

    return Profile;
}
