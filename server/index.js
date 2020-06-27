const app = require("./app");
const db = require("../db/models/index.js");
require("dotenv").config();

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
