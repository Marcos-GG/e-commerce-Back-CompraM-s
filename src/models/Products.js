const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Products",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString: (value) => {
            if (typeof value !== "string") {
              throw new Error("El titulo debe contener texto válido"); //!
            }
          },
          len: {
            args: [5, 39],
          },
        },
      },

      image1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image3: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image4: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [20, 1000], // Longitud entre 20 y 1500 caracteres
        },
      },

      price: {
        // precio
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      gender: {
        // genero
        type: DataTypes.STRING,
        allowNull: false,
      },

      category: {
        // categorias
        type: DataTypes.STRING,
        allowNull: false,
      },

      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: true,
          min: 0,
        },
      },

      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
