"use strict";

const { sq: sequelize } = require("../config/db-setup");

require("dotenv").config();

const db = {
  BookModel: require("./Book.Model")(sequelize),
  PageModel: require("./Page.Model")(sequelize),
  UserModel: require("./User.Model")(sequelize),
  LastReadModel: require("./LastRead.model")(sequelize),
};

// Associate models
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize;

module.exports = db;
