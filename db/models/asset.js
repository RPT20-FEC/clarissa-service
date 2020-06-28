"use strict";
module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define(
    "Asset",
    {
      url: DataTypes.STRING,
      description: DataTypes.STRING,
      listingId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Listing",
          key: "id",
          as: "listingId",
        },
      },
    },
    {}
  );
  Asset.associate = function (models) {
    // associations can be defined here
    Asset.belongsTo(models.Listing, {
      foreignKey: "listingId",
      onDelete: "CASCADE",
    });
  };
  return Asset;
};
