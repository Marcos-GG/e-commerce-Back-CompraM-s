const putCategoryController = require("../../Controllers/Categorias/putCategory");

const putCategoryHandler = async (req, res) => {
  try {
    const { categoryId, name } = req.body;

    const categoriaActualizada = await putCategoryController({
      categoryId,
      name,
    });

    if (!categoriaActualizada)
      throw new Error("No se ha podido actualizar la categoria.");
    res.status(200).send({
      message: "categoria actualizada correctamente",
      data: categoriaActualizada,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = putCategoryHandler;
