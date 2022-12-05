"use strict";
const { Model } = require("sequelize");
const { STATUS_MATCH } = require("../src/shared/constant");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  user.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      winRateDefault: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(STATUS_MATCH),
        allowNull: false,
        defaultValue: "active",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  user.associate = function (models) {
    user.belongsToMany(models.team, {
      through: "user_team",
      timestamps: false,
    });
  };
  return user;
};
