"use strict";
const { Model } = require("sequelize");
const { STATUS_MATCH, STATE_MATCH } = require("../src/shared/constant");
module.exports = (sequelize, DataTypes) => {
  class match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  match.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      state: {
        type: DataTypes.ENUM(STATE_MATCH),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(200),
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
      modelName: "match",
    }
  );
  match.associate = function (models) {
    match.hasMany(models.team, {
      foreignKey: "match_id",
    });
  };

  return match;
};
