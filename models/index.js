'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

<<<<<<< HEAD
// db.User = require(“./user.js”)(sequelize, Sequelize);
// db.Project = require(“./project.js”)(sequelize, Sequelize);
// db.User.hasMany(db.Project, { as: “ProjectId” });
// db.Project.belongsTo(db.User, {
//   foreignKey: “UserId”,
//   as: “User”,
// });


=======
db.User = require("./user.js")(sequelize, Sequelize);
db.Project = require("./project.js")(sequelize, Sequelize);

db.User.hasMany(db.Project, { as: "ProjectId" });
db.Project.belongsTo(db.User, {
  foreignKey: "UserId",
  as: "User",
});
>>>>>>> 1fb823839fa775dd28e2f8f3cbee7d953c13e710

module.exports = db;