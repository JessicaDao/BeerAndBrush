module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define('Project', {
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


    Project.associate = function (models) {
        Project.belongsTo(models.User);
    };

    // User.associate = function(models){
    //     User.hasMany(models._____);
    // };

    return Project;
}