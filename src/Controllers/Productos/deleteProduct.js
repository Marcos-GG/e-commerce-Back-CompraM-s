const { Products } = require("../../db.js");

const deleteProductController = async (id) => {
  const product = await Products.destroy({
    where: { id: id },
  });

  return product;
};

module.exports = deleteProductController;
