const express = require("express");
const Listing = require("../database/Listing");
const app = express();
const path = require("path");

app.use(express.static(__dirname + "/../public"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/listings/", function (req, res) {
  Listing.find(function (err, listings) {
    if (err) {
      return console.error(err);
    }
    res.status(200).json(listings);
  });
});

app.get("/listings/:id/photos/", function (req, res) {
  Listing.findOne({ listingId: req.params.id }).exec((err, listing) => {
    if (err) {
      return console.error(err);
    }
    res.status(200).json(listing.assets);
  });
});

app.get("/:id", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

module.exports = app;
