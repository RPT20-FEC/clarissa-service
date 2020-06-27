const express = require("express");
const app = express();
const path = require("path");
const compression = require("compression");
const expressStaticGzip = require("express-static-gzip");
const bodyParser = require("body-parser");
const db = require("../db/models/index.js");

require("dotenv").config();
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
  db.Listing.findAll()
    .then((listings) => {
      console.log(listings);
      return res.status(200).json({ listings });
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.get("/listings", async (req, res) => {
//   try {
//     const listings = await db.Listing.findAll();
//     return res.status(200).json({ listings });
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

// app.get("/listings", async (req, res) => {
//   try {
//     const listings = await db.Listing.findAll();
//     return res.status(200).json({ listings });
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

// id routes

// app.get("/:id", (req, res) => {
//   res.sendFile(path.join(__dirname + "/../public/index.html"));
// });

// app.get("/listings/:id", async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const listing = await models.Listing.findOne({
//       where: { listingId: req.params.id },
//     });
//     if (listing) {
//       return res.status(200).json({ listing });
//     }
//     return res
//       .status(404)
//       .send("Listing with the specified ID does not exists");
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

// app.put("/listings/:id", async (req, res) => {
//   try {
//     const updated = await models.Listing.update(req.body, {
//       where: { listingId: req.params.id },
//     });
//     if (updated) {
//       const updatedListing = await models.Listing.findOne({
//         where: { listingId: req.params.id },
//       });
//       return res.status(200).json({ listing: updatedListing });
//     }
//     throw new Error("Listing not found");
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

// app.delete("/listings/:id", async (req, res) => {
//   try {
//     const deleted = await models.Listing.destroy({
//       where: { listingId: req.params.id },
//     });
//     if (deleted) {
//       return res.status(204).send("Listing deleted");
//     }
//     throw new Error("Listing not found");
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

module.exports = app;
