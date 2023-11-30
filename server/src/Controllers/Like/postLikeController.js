const { Like, Products } = require("../../db");

const postLikeController = async ({ productId, userId }) => {
  // creamos el like
  const createLike = await Like.create({
    where: {
      userId: userId,
      productId: productId,
    },
  });

  // traemos el prodcuto para luego actualizar el valor
  const product = await Products.findOne({
    where: { id: productId },
  });

  // actualizamos el valor
  if (product.likes >= 0) {
    product.likes += 1;

    await product.save();
  }

  return createLike;
};

module.exports = postLikeController;
