const { Sequelize, DataTypes } = require("sequelize");

("use strict");
/** @type {import('umzug').RunnableMigration<import('sequelize').QueryInterface>} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("Books", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      author: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      lastReadPage: DataTypes.UUID,
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down({ context: queryInterface }) {
    await queryInterface.dropTable("Books");
  },
};
