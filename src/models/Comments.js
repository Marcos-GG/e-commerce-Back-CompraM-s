const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },

      // ID del usuario que realiza el comentario
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      // ID de la publicación a la que pertenece el comentario
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },

      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [2, 1000],
            msg: "Debe tener entre 10 y 300 caracteres",
          },
        },
      },
    },
    { timestamps: true }
  );
};
