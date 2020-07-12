const express = require("express");
const app = express();
const path = require("path");
const compression = require("compression");
const expressStaticGzip = require("express-static-gzip");
const bodyParser = require("body-parser");
var PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));
const nr = require("newrelic");

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

// Pouch db setup

var db = new PouchDB("http://admin:master@localhost:5984/sdc_listings");

db.info().then(function (info) {
  console.log(info);
});

// all listings routes

app.get("/listings", (req, res) => {
  db.allDocs({
    include_docs: true,
    attachments: true,
    startkey: "1001",
    endkey: "1005",
  })
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/listings/:id", (req, res) => {
  db.createIndex({
    index: { fields: ["listingId"] },
  }).then(function (data) {
    console.log("data", data);
    return db
      .find({
        selector: { listingId: req.params.id },
      })
      .then(function (doc) {
        console.log("doc", doc.docs[0].assets[0]);
        res.json(doc.docs[0].assets[0]);
        res.end();
      })
      .catch(function (err) {
        console.log("err", err);
      });
  });
});

// OLD MONGODB QUERIES

// app.post("/listings", (req, res) => {
//   var newListing = new Listing(req.body);
//   newListing.save((err) => {
//     if (err) {
//       return console.error(err);
//     }
//     res.status(200);
//     res.end();
//   });
// });

// // id routes

// app.get("/:id", (req, res) => {
//   res.sendFile(path.join(__dirname + "/../public/index.html"));
// });

// app.get("/listings/:id", function (req, res) {
//   Listing.findOne({ listingId: req.params.id }).exec((err, listing) => {
//     if (err) {
//       return console.error(err);
//     }
//     res.status(200).json(listing);
//   });
// });

// app.put("/listings/:id", async (req, res) => {
//   try {
//     var listing = await Listing.findOne({ listingId: req.params.id }).exec();
//     listing.set(req.body);
//     var result = await listing.save();
//     res.send(result);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.put("/listings/:id", function (req, res) {
//   console.log(req.body);
//   Listing.findOne(
//     { listingId: req.params.id },
//     {
//       $set: {
//         documentId: req.body.documentId,
//         listingId: req.body.documentId,
//         assets: req.body.assets,
//       },
//     }
//   )
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => console.error(error));
// });

// app.delete("/listings/:id", (req, res) => {
//   Listing.deleteOne({ listingId: req.params.id })
//     .then((result) => {
//       res.json(`Deleted listing`);
//     })
//     .catch((error) => console.error(error));
// });

// photos route

// app.get("/listings/:id/photos", function (req, res) {
//   Listing.findOne({ listingId: req.params.id }).exec((err, listing) => {
//     if (err) {
//       return console.error(err);
//     }
//     res.status(200).json(listing.assets);
//   });
// });

module.exports = app;
