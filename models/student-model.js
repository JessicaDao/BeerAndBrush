module.exports = function (sequelize, DataTypes) {
    var Student = sequelize.define('Student', {
        classesTaken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        schedule: {
            type: DataTypes.STRING,
            allowNull: true
        },
        projects: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    // Project.associate = function (models) {
    //     Project.belongsTo(models.User);
    // };

    return Student;
}