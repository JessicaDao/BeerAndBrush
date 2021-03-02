module.exports = function (sequelize, DataTypes) {
    var Instructor = sequelize.define('Instructor', {
        classesTaught: {
            type: DataTypes.STRING,
            allowNull: true
        },
        schedule: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });


    return Instructor;
}