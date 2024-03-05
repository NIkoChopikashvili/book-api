"use strict";
const { Model, DataTypes } = require("sequelize");

/**
 * Used to keep data about book.
 * @param sequelize
 * @returns {*}
 */
module.exports = (sequelize) => {
  class BookModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookModel.hasMany(models.PageModel, {
        foreignKey: { name: "bookId", allowNull: false },
        as: "Pages",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  BookModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      author: DataTypes.STRING,
      lastReadPage: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "Books",
    }
  );
  return BookModel;
};
