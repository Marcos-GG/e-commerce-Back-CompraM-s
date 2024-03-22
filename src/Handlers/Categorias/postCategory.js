const postCategoryController = require("../../Controllers/Categorias/postCategory");

const postCategoryHandler = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new Error("No se recibio la categoria");
    }

    const newCategory = await postCategoryController({ name });

    return res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = postCategoryHandler;
