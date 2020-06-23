const { sequelize, models } = require("./models");
const fs = require("fs");
const csvWriter = require("csv-write-stream");

const writer = csvWriter();

const propertyAssets = [
  [
    {
      url:
        "https://images.unsplash.com/photo-1559767949-0faa5c7e9992?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Lovely four bedroom, farmhouse home",
    },
    {
      url:
        "https://images.unsplash.com/photo-1484301548518-d0e0a5db0fc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Outdoor patio",
    },
    {
      url:
        "https://images.unsplash.com/photo-1524360526339-9ad59a9f7f8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "House Cat",
    },
    {
      url:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=50&auto=compress",
      description: "Four, cozy bedrooms",
    },
    {
      url:
        "https://images.unsplash.com/photo-1542853647-47ad77242390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Views of the lake",
    },
  ],
  [
    {
      url:
        "https://images.unsplash.com/photo-1533443144047-ea8a81e83e68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Steps from the ocean",
    },
    {
      url:
        "https://images.unsplash.com/photo-1511840636560-acee95b3a83f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Oasis on the beach",
    },
    {
      url:
        "https://images.unsplash.com/photo-1582289545106-efecf907f21e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Bright and airy interior",
    },
    {
      url:
        "https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Three bedrooms",
    },
    {
      url:
        "https://images.unsplash.com/flagged/photo-1556438758-1d61c8c65409?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Three bedrooms",
    },
  ],
  [
    {
      url:
        "https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Modern gem",
    },
    {
      url:
        "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Space for the whole family",
    },
    {
      url:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Fully-stocked kitchen",
    },
    {
      url:
        "https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Three bedrooms",
    },
    {
      url:
        "https://images.unsplash.com/flagged/photo-1556438758-1d61c8c65409?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Three bedrooms",
    },
  ],
  [
    {
      url:
        "https://images.unsplash.com/photo-1534512900-8ef06ef6cce7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "California gem",
    },
    {
      url:
        "https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Bright and Airy",
    },
    {
      url:
        "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Fully-stocked kitchen",
    },
    {
      url:
        "https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Three bedrooms",
    },
    {
      url:
        "https://images.unsplash.com/flagged/photo-1556438758-1d61c8c65409?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=50&auto=compress",
      description: "Three bedrooms",
    },
  ],
];

const randomPropertyAssets = function () {
  return propertyAssets[Math.floor(Math.random() * Math.floor(4))];
};

// const generateSeedData = function () {
//   for (var i = 1; i < 7; i++) {
//     writer.pipe(fs.createWriteStream(`data${i}.csv`));

//     for (var j = 0; j < 150; j++) {
//       writer.write({
//         listingId: 1000 + j,
//         assets: randomPropertyAssets(),
//       });
//     }

//     sequelize.query(
//       `\COPY sdc_listings (listingId, assets) FROM '/Users/clarissajaime/Workspace/hack-reactor/capstone-projects/photo-service/data${i}.csv' DELIMITER ',' CSV HEADER;`,
//       (error, data) => {
//         if (error) {
//           return console.error(error);
//         }
//         console.log("successfully seeded the db");
//       }
//     );
//   }
//   writer.end();
// };

// const eraseDatabaseOnSync = true;

// const createListingsWithAssets = async () => {
//   let data = await generateSeedData();
//   sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
//     if (eraseDatabaseOnSync) {
//       models.Listing.bulkCreate(data);
//     }
//   });
// };

// createListingsWithAssets();
generateSeedData();
