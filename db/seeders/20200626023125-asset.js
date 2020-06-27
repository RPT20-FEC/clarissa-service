"use strict";
var faker = require("faker");

const createdAt = new Date();
const updatedAt = new Date();
var description = faker.lorem.sentence();
const url =
  "https://images.unsplash.com/photo-1559767949-0faa5c7e9992?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Assets",
      [
        {
          url,
          description,
          createdAt,
          updatedAt,
        },
        {
          url,
          description,
          createdAt,
          updatedAt,
        },
        {
          url,
          description,
          createdAt,
          updatedAt,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Assets", null, {});
  },
};
