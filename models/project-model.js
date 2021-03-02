module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define('Project', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artistName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateStarted: {
            type: DataTypes.DATE,
            allowNull: true
        },
        dateFinished: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        materialUsed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        forSale: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false
        }
    });
    { timestamps: true }


    Project.associate = function (models) {
        Project.belongsTo(models.User);
    };

    return Project;
}
