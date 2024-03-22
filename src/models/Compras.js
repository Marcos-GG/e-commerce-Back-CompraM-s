const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Compras",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_merchant_order: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      monto_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
