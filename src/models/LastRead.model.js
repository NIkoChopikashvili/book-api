"use strict";
const { Model, DataTypes } = require("sequelize");

/**
 * Used to keep data about book.
 * @param sequelize
 * @returns {*}
 */
module.exports = (sequelize) => {
  class LastReadModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LastReadModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      userId: DataTypes.UUID,
      bookId: DataTypes.UUID,
      page: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      sequelize,
      tableName: "LastReads",
    }
  );
  return LastReadModel;
};
