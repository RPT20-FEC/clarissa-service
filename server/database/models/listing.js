module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define("listing", {
    listingId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  Listing.associate = (models) => {
    Listing.hasMany(models.Asset, { onDelete: "CASCADE" });
  };

  Listing.findByListingId = async (id) => {
    let listing = await Listing.findOne({
      where: { listingId: id },
    });

    return listing;
  };

  return Listing;
};
