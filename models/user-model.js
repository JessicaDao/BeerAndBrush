//bcrypt package to encrypt password
const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes){
    var User = sequelize.define('User', {
     fname:{
        type:DataTypes.STRING,
        allowNull:false
    },
      lname:{
        type:DataTypes.STRING,
        allowNull:false
    },
      email: {
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
      uname:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
      pw:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
         len:[8]
      }}
    },
    { timestamps: true }
);

    User.associate = function(models){
        User.hasMany(models.Class);
        User.hasMany(models.Project);
        User.hasMany(models.Review);

    };

//encrypts password
    User.beforeCreate(function(user) {
        user.pw = bcrypt.hashSync(user.pw, bcrypt.genSaltSync(10), null);
    });
    
    return User;
}
