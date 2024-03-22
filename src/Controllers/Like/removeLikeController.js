const { Products, Like } = require("../../db");

const removeLikeController = async ({ productId, userId }) => {
  try {
    const like = await Like.destroy({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (!like) throw new Error("No se pudo sacar el like");

    const product = await Products.findByPk(productId);

    if (product.likes > 0) {
      product.likes = product.likes - 1;

      await product.save();
    }

    return { productId, like };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = removeLikeController;
