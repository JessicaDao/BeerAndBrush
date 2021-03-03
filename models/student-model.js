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

  const Classes = sequelize.define("Classes", { name: DataTypes.STRING });
  const Student = sequelize.define("Student", { name: DataTypes.STRING });
  Classes.belongsToMany(Student, { through: "StudentClasses" });
  Student.belongsToMany(Classes, { through: "StudentClasses" });

  return Student;
};
