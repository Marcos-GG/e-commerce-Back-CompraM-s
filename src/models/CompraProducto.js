const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "CompraProducto",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_compra: {
        type: DataTypes.INTEGER,
      },
      id_producto: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};
