const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * changeColumn(name) => "matches"
 *
 */

const info = {
  revision: 2,
  name: "change_size_column_name_match",
  created: "2022-11-09T02:29:14.977Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "matches",
      "name",
      { type: Sequelize.STRING(100), field: "name", allowNull: false },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "matches",
      "name",
      { type: Sequelize.STRING(50), field: "name", allowNull: false },
      { transaction },
    ],
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
