"use strict";
const { Model, DataTypes } = require("sequelize");

/**
 * Used to keep data about specific page.
 * @param sequelize
 * @returns {*}
 */
module.exports = (sequelize) => {
  class PageModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PageModel.belongsTo(models.BookModel, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false,
          name: "bookId",
        },
        as: "Book",
        indexes: [
          {
            name: "pages_bookId_index",
            unique: false,
            fields: ["bookId"],
          },
        ],
      });
    }
  }
  PageModel.init(
    {
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
    },
    {
      sequelize,
      tableName: "Pages",
    }
  );
  return PageModel;
};
