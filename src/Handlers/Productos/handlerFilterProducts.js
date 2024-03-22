const controllerApplyFilters = require("../../Controllers/Productos/controllerApplyFilters");

const handlerApplyFilters = async (req, res) => {
  try {
    const { category, gender, morePopular, price } = req.body;
    const { page } = req.query;

    const productosFiltrados = await controllerApplyFilters({
      category,
      gender,
      morePopular,
      price,
      page,
    });
    if (productosFiltrados.length === 0)
      throw new Error("No se pudo filtar los porductos");

    return res.status(200).json(productosFiltrados);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = handlerApplyFilters;
