const { Category, Products } = require("../../db");

const putCategoryController = async ({ categoryId, name }) => {
  if (categoryId) {
    // Buscar la categoría a actualizar
    const category = await Category.findByPk(categoryId);

    // Verificar si se encontró la categoría
    if (category) {
      // Buscar todos los productos que tenían la categoría antigua
      const products = await Products.findAll({
        where: { category: category.name },
      });

      // Actualizar el nombre de la categoría
      category.name = name;
      await category.save(); //remera

      // Actualizar la categoría en cada producto
      for (let i = 0; i < products.length; i++) {
        products[i].category = name; // buzos = remera
        await products[i].save();
      }

      return category;
    } else {
      throw new Error("No se encontró la categoría con el ID proporcionado.");
    }
  } else {
    throw new Error("Falta el ID de la categoría.");
  }
};

module.exports = putCategoryController;
