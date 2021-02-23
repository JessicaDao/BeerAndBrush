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
        allowNull:false,
        validate: {
          validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email!"
        }
    },
      username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
      password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
         len:[8]
      }}
});
    // User.associate = function(models){
    //     User.hasMany(models._____);
    // };
//encrypts password
    User.beforeCreate(function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    
    return User;
}

