const mongoose = require("mongoose");
const mongoUri = "mongodb://localhost:27017/photo-service";

const db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

module.exports = db;
