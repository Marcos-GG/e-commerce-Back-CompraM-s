const { Category } = require("../../db");

const postCategoryController = async (name) => {
  // creamos la categoria

  const newCategory = await Category.create(name);

  if (!newCategory) throw new Error("No se pudo crear la categoria");

  return newCategory;
};

module.exports = postCategoryController;
