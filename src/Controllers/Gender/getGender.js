const { Products, Gender } = require("../../db");

const getGenderController = async (gender) => {
  if (gender) {
    const productsWithCategory = await Products.findAll({
      where: {
        gender: gender,
      },
    });

    if (!productsWithCategory.length)
      throw new Error("No existen productos con la categoria seleccionada");

    return productsWithCategory;
  }

  const allGenders = await Gender.findAll();

  if (!allGenders.length) throw new Error("No existen categorias");

  return allGenders;
};

module.exports = getGenderController;
