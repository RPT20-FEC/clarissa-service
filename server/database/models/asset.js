module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define("asset", {
    imageId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Asset.associate = (models) => {
    Asset.belongsTo(models.Listing);
  };

  return Asset;
};
