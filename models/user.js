//bcrypt package to encrypt password
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false
    },
<<<<<<< HEAD
      email: {
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
=======
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      // TODO: look in to how to validate with Regex
      // validate: {
      //   validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      //         message: "Please enter a valid email!"
      // }
>>>>>>> 1fb823839fa775dd28e2f8f3cbee7d953c13e710
    },
    uname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    pw: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    }
  },
    { timestamps: true }
<<<<<<< HEAD
);

    User.associate = function(models){
        User.hasMany(models.class-details);
        User.hasMany(models.project);
        User.hasMany(models.reviews);

    };
=======
  );
  // User.associate = function(models){
  //     User.hasMany(models._____);
  // };

  //encrypts password
  User.beforeCreate(function (user) {
    user.pw = bcrypt.hashSync(user.pw, bcrypt.genSaltSync(10), null);
  });
>>>>>>> 1fb823839fa775dd28e2f8f3cbee7d953c13e710

  return User;
}

