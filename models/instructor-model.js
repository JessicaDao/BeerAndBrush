module.exports = function(sequelize, DataTypes){
    var Instructor = sequelize.define('Instructor', {
    sfgf:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fsgef:{
        type:DataTypes.STRING,
        allowNull:false
    },
    czefd:{
        type:DataTypes.DATE,
        allowNull:false
    }
});
    Instructor.associate = function(models){
        Instructor.belongsTo(models.User);

    };
    return Instructor;
}

