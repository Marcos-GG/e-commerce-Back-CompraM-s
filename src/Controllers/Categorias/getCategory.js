const { Products, Category } = require("../../db");

const getCategoryController = async (category) => {
  if (category) {
    const products = await Products.findAll({
      where: { category: category },
    });

    return products;
  }

  const allCategories = await Category.findAll();

  if (allCategories.length === 0) throw new Error("No hay categorias");

  return allCategories;
};

module.exports = getCategoryController;
