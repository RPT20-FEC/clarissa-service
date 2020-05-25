const express = require("express");
const Listing = require("../database/Listing");
const app = express();
const path = require("path");
const compression = require("compression");
const expressStaticGzip = require("express-static-gzip");

app.use(compression());

app.use(
  "/",
  expressStaticGzip(path.join(__dirname + "/../public"), {
    enableBrotli: true,
  })
);

// app.get(
//   "*",
//   expressStaticGzip(path.join(__dirname), {
//     urlContains: "public",
//     fallthrough: false,
//     enableBrotli: true,
//   })
// );

// app.use(express.static(__dirname + "/../public"));

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
    res.status(200).json(listings.sort());
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
