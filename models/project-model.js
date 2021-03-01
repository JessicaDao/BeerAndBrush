module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define('Project', {
        name: {
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
            type: DataTypes.VARCHAR,
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
        }
    });
    { timestamps: true }


    Project.associate = function (models) {
        Project.belongsTo(models.User);
    };

    return Project;
}
