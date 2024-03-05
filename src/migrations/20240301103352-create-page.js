const { Sequelize, DataTypes } = require("sequelize");

("use strict");
/** @type {import('umzug').RunnableMigration<import('sequelize').QueryInterface>} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("Pages", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Books",
          key: "id",
        },
      },
      content: { type: DataTypes.TEXT, allowNull: false },
      page: DataTypes.INTEGER,
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
    await queryInterface.dropTable("Pages");
  },
};
