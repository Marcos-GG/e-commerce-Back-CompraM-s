const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // Numero de documento de identidad del usuario con el atributo que debe ser unico.
      DNI: {
        type: DataTypes.INTEGER,
        unique: true,
        validate: {
          isInt: true,
        },
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
