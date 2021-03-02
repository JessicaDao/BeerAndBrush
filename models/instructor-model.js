module.exports = function (sequelize, DataTypes) {
    var Student = sequelize.define('Student', {
        classesTaken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        schedule: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });


    return Student;
}