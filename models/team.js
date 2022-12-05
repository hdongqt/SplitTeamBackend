"use strict";
const { Model } = require("sequelize");
const { RESULT_MATCH, STATUS_MATCH } = require("../src/shared/constant");
module.exports = (sequelize, DataTypes) => {
  class team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  team.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        allowNull: false,
      },
      team_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      result: {
        type: DataTypes.ENUM(RESULT_MATCH),
        allowNull: false,
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
      modelName: "team",
    }
  );
  team.associate = function (models) {
    team.belongsTo(models.match, {
      foreignKey: "match_id",
    });
    team.belongsToMany(models.user, {
      through: "user_team",
      timestamps: false,
    });
  };
  return team;
};
