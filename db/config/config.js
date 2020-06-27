const path = require("path");

module.exports = {
  development: {
    database: "sdc_listings",
    dialect: "postgres",
  },
  test: {
    database: "sdc_listings",
    dialect: "postgres",
  },
  production: {
    database: "sdc_listings",
    dialect: "postgres",
    logging: false,
  },
};
