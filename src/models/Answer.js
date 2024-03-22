const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Answer", {
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

    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [2, 1000],
      },
    },

    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
};
