const express = require("express");
const Listing = require("../database/Listing");
const app = express();
const path = require("path");
const compression = require("compression");
const expressStaticGzip = require("express-static-gzip");
const bodyParser = require("body-parser");

app.use(compression());

app.use(
  "/",
  expressStaticGzip(path.join(__dirname + "/../public"), {
    enableBrotli: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// all listings routes

app.get("/listings", (req, res) => {
  Listing.find({})
    .then((listings) => {
      res.json(listings);
    })
    .catch((err) => new Error(err));
});

app.post("/listings", (req, res) => {
  var newListing = new Listing(req.body);
  newListing.save((err) => {
    if (err) {
      return console.error(err);
    }
    res.status(200);
    res.end();
  });
});

// id routes

app.get("/:id", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

app.get("/listings/:id", function (req, res) {
  Listing.findOne({ listingId: req.params.id }).exec((err, listing) => {
    if (err) {
      return console.error(err);
    }
    res.status(200).json(listing);
  });
});

app.put("/listings/:id", async (req, res) => {
  try {
    var listing = await Listing.findOne({ listingId: req.params.id }).exec();
    listing.set(req.body);
    var result = await listing.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/listings/:id", function (req, res) {
  console.log(req.body);
  Listing.findOne(
    { listingId: req.params.id },
    {
      $set: {
        documentId: req.body.documentId,
        listingId: req.body.documentId,
        assets: req.body.assets,
      },
    }
  )
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.error(error));
});

app.delete("/listings/:id", (req, res) => {
  Listing.deleteOne({ listingId: req.params.id })
    .then((result) => {
      res.json(`Deleted listing`);
    })
    .catch((error) => console.error(error));
});

// photos route

app.get("/listings/:id/photos", function (req, res) {
  Listing.findOne({ listingId: req.params.id }).exec((err, listing) => {
    if (err) {
      return console.error(err);
    }
    res.status(200).json(listing.assets);
  });
});

module.exports = app;
