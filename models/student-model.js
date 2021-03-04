module.exports = function (sequelize, DataTypes) {
  var Student = sequelize.define("Student", {
    classesTaken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    schedule: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    projects: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Student.associate =(models)=>{
    Student.belongsToMany(models.Class, { through: "StudentClasses" });
  }
  
  

  return Student;
};
