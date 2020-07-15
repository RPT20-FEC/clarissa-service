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

// get routes

app.get("/listings", (req, res) => {
  db.allDocs({
    include_docs: true,
    attachments: true,
  })
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/listings/:id", (req, res) => {
  const reformatPhotoData = (data) => {
    const objValues = Object.values(data);
    const urls = objValues[2].split(",");
    const descriptions = objValues[3].split(",");
    const assets = [];

    for (let i = 0; i < urls.length; i++) {
      assets.push({ url: urls[i], decription: descriptions[i] });
    }

    return assets;
  };

  db.find({
    selector: { _id: req.params.id },
  })
    .then(function (doc) {
      res.json(reformatPhotoData(doc.docs[0]));
      res.end();
    })
    .catch(function (err) {
      console.log("err", err);
    });
});

module.exports = app;
