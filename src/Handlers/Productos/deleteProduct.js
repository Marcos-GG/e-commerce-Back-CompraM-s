const deleteProductController = require("../../Controllers/Productos/deleteProduct");

const deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await deleteProductController(id);

    if (!deleteProduct) throw new Error("No se pudo eliminar la publicacion");

    return res.status(200).json(deleteProduct);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = deleteProductHandler;
