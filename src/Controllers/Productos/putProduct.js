const { Products } = require("../../db");

const putProductController = async (id, productData) => {
  const product = await Products.findByPk(id);

  if (!product) throw new Error("Producto no encontrado");

  if (!product.title !== undefined) product.title = productData.title;
  if (!product.description !== undefined)
    product.description = productData.description;
  if (!product.price !== undefined) product.price = productData.price;
  if (!product.image1 !== undefined) product.image1 = productData.image1;
  if (!product.image2 !== undefined) product.image2 = productData.image2;
  if (!product.image3 !== undefined) product.image3 = productData.image3;
  if (!product.image4 !== undefined) product.image4 = productData.image4;
  if (!product.gender !== undefined) product.gender = productData.gender;
  if (!product.category !== undefined) product.category = productData.category;
  if (!product.status !== undefined) product.status = productData.status;

  await product.save();

  return product;
};

module.exports = putProductController;
