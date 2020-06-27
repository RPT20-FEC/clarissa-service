"use strict";
module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define(
    "Asset",
    {
      url: DataTypes.STRING,
    },
    {
      description: DataTypes.STRING,
    },
    {}
  );
  Asset.associate = function (models) {
    // associations can be defined here
    Asset.belongsTo(models.Listing, {
      foreignKey: "listingId",
    });
  };
  return Asset;
};
