module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define('Project', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artistId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dateStarted: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateFinished: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
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
        }
    });
    { timestamps: true }


    Project.associate = function (models) {
        Project.belongsTo(models.User);
    };

    return Project;
}
