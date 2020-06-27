"use strict";

module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define(
    "Listing",
    {
      name: DataTypes.STRING,
    },
    {}
  );
  Listing.associate = function (models) {
    // associations can be defined here
    Listing.hasMany(models.Asset, {
      foreignKey: "listingId",
      as: "assets",
    });
  };
  return Listing;
};
