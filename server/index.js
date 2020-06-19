const app = require("./app");
const { sequelize, models } = require("./database/models");
require("dotenv").config();

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createListingsWithAssets();
  }
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});

// * Database Seeding * //

const createListingsWithAssets = async () => {
  await models.Listing.create(
    {
      listingId: 105,
      assets: [
        {
          imageId: "5ecae55994f6f913fbe83871",
          description: "California gem",
          url:
            "https://images.unsplash.com/photo-1534512900-8ef06ef6cce7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress",
        },
      ],
    },
    {
      include: [models.Asset],
    }
  );
};
