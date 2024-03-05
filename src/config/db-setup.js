const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(
  process.env.DB || "books",
  process.env.ROLE,
  process.env.PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: !process.env.DISABLE_SQL_LOGGER,
    dialectModule: require("pg"),
  }
);

const migrator = new Umzug({
  migrations: { glob: "src/migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  try {
    await migrator.up();
  } catch (error) {
    console.error(error);
    throw new Error("Migration Error");
  }
})();

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sq: sequelize, testDbConnection, migrator };
