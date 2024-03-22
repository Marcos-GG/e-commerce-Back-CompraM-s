const getCategoryController = require("../../Controllers/Categorias/getCategory");

const getCategoryHandler = async (req, res) => {
  try {
    const { category } = req.query;

    if (category) {
      const getCategory = await getCategoryController(category);

      if (!getCategory)
        throw new Error(
          "No se encontro una publicacion con la categoria seleccionada"
        );

      return res.status(200).json(getCategory);
    }

    const getAllCategories = await getCategoryController();

    if (getAllCategories.length === 0) throw new Error("No existen Categorias");

    return res.status(200).json(getAllCategories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getCategoryHandler;
