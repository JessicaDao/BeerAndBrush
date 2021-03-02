module.exports = function(sequelize, DataTypes){
    var Student = sequelize.define('Student', {
    rserg:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rgrg:{
        type:DataTypes.STRING,
        allowNull:false
    },
    gseger:{
        type:DataTypes.DATE,
        allowNull:false
    }
});
    Student.associate = function(models){
        Student.belongsTo(models.User);

    };
    return Student;
}

