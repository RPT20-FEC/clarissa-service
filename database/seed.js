const db = require("./index.js");
const Listing = require("./Listing.js");

const insertSeedData = function () {
  const seederData = [];

  for (var i = 1; i < 101; i++) {
    var singleProp = {
      documentId: i,
      listingId: 1000 + i,
      assets: [
        {
          url:
            "https://images.unsplash.com/photo-1559767949-0faa5c7e9992?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          description: "Lovely four bedroom, farmhouse home",
        },
        {
          url:
            "https://images.unsplash.com/photo-1484301548518-d0e0a5db0fc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          description: "Outdoor patio",
        },
        {
          url:
            "https://images.unsplash.com/photo-1524360526339-9ad59a9f7f8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          description: "House Cat",
        },
        {
          url:
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
          description: "Four, cozy bedrooms",
        },
        {
          url:
            "https://images.unsplash.com/photo-1542853647-47ad77242390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          description: "Views of the lake",
        },
      ],
    };

    seederData.push(singleProp);
  }

  Listing.create(seederData)
    .then(() => {
      console.log("Success creating and seeding db.");
    })
    .catch((err) => {
      console.log(err);
    });
};

insertSeedData();
