const express = require("express");
const app = express();
const path = require("path");
const compression = require("compression");
const expressStaticGzip = require("express-static-gzip");
const bodyParser = require("body-parser");
const { models } = require("../database/models");

require("dotenv").config();
app.use(compression());

app.use(
  "/",
  expressStaticGzip(path.join(__dirname + "/../public"), {
    enableBrotli: true,
  })
);

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.listings[1],
  };
  next();
});

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

app.use("/listings", routes.listing);

// app.use(cors());

// all listings routes

app.get("/listings", (req, res) => {
  pool.query("SELECT * FROM listings", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// app.post("/listings", (req, res) => {
//   const { listingid, assets } = req.body;
//   pool
//     .query(
//       "INSERT INTO listings (listingid, assets) VALUES (listingid, assets)",
//       [listingid, assets]
//     )
//     .then((result) => result.rows[0]);
// });

// id routes

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

// // photos route

// app.get("/listings/:id/photos", function (req, res) {
//   Listing.findOne({ listingId: req.params.id }).exec((err, listing) => {
//     if (err) {
//       return console.error(err);
//     }
//     res.status(200).json(listing.assets);
//   });
// });

module.exports = app;
