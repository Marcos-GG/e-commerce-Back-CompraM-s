const { Like, Products } = require("../../db.js");

const getFavoritesController = async (userId) => {
  const Likes = await Like.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: Products,
        include: { model: Like },
      },
    ],
  });

  return Likes;
};

module.exports = getFavoritesController;
