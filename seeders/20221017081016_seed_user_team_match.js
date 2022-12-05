"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete("teams", null, {
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete("matches", null, {
      truncate: true,
      cascade: true,
    });

    await queryInterface.bulkInsert("users", [
      {
        name: "Đỗ thuận",
        username: "ciuciu",
        status: "active",
      },
      {
        name: "Dung Lê",
        username: "mom",
        status: "active",
      },
      {
        name: "mit grand quang tri",
        username: "mitgrand",
        status: "active",
      },
      {
        name: "yasou",
        username: "yasou",
        status: "active",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const { sequelize } = queryInterface;
  },
};
