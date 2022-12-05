const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "matches", deps: []
 * createTable() => "users", deps: []
 * createTable() => "teams", deps: [matches]
 * createTable() => "user_team", deps: [teams, users]
 *
 */

const info = {
  revision: 1,
  name: "noname",
  created: "2022-11-07T04:48:37.113Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "matches",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
        },
        name: { type: Sequelize.STRING(50), field: "name", allowNull: false },
        state: {
          type: Sequelize.ENUM("INPROGRESS", "FINISHED"),
          field: "state",
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(200),
          field: "description",
          allowNull: true,
        },
        status: {
          type: Sequelize.ENUM("active", "deactivate"),
          field: "status",
          defaultValue: "active",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "users",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
        },
        username: {
          type: Sequelize.STRING(20),
          field: "username",
          allowNull: false,
        },
        name: { type: Sequelize.STRING(30), field: "name", allowNull: false },
        winRateDefault: {
          type: Sequelize.DECIMAL(5, 2),
          field: "winRateDefault",
          allowNull: true,
        },
        status: {
          type: Sequelize.ENUM("active", "deactivate"),
          field: "status",
          defaultValue: "active",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "teams",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
        },
        team_type: {
          type: Sequelize.STRING(50),
          field: "team_type",
          allowNull: false,
        },
        result: {
          type: Sequelize.ENUM("PENDING", "WIN", "LOSE"),
          field: "result",
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM("active", "deactivate"),
          field: "status",
          defaultValue: "active",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        match_id: {
          type: Sequelize.UUID,
          field: "match_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "matches", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_team",
      {
        teamId: {
          type: Sequelize.UUID,
          field: "teamId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "teams", key: "id" },
          primaryKey: true,
        },
        userId: {
          type: Sequelize.UUID,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["matches", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["teams", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_team", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
