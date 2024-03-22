const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Like",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          isInt: true,
          min: 1,
        },
      },

      userId: {
        // id del usuario que le da like a la publicacion
        type: DataTypes.UUID,
        allowNull: true,
      },

      productId: {
        // toma el id de la publicacion a la que le dieron like
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
          min: 1,
        },
      },
    },
    { timestamps: false }
  );
};
