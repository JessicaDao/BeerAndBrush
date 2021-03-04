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

  // const Classes = sequelize.define("Classes", { name: DataTypes.STRING });
  // const Student = sequelize.define("Student", { name: DataTypes.STRING });
  Student.associate =(models)=>{
    Student.belongsToMany(models.Class, { through: "StudentClasses" });
  }
  
  

  return Student;
};
