"use strict";
var faker = require("faker");

const createdAt = new Date();
const updatedAt = new Date();
var name = faker.lorem.sentence();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Listings",
      [
        {
          name,
          listingId,
          assets,
          createdAt,
          updatedAt,
        },
        {
          name,
          createdAt,
          updatedAt,
        },
        {
          name,
          createdAt,
          updatedAt,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Listings", null, {});
  },
};
