const { Sequelize, DataTypes } = require("sequelize");

("use strict");
/** @type {import('umzug').RunnableMigration<import('sequelize').QueryInterface>} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("LastReads", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      userId: DataTypes.UUID,
      bookId: DataTypes.UUID,
      page: { type: DataTypes.INTEGER, defaultValue: 0 },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down({ context: queryInterface }) {
    await queryInterface.dropTable("LastReads");
  },
};
