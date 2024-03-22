const getFavoritesController = require("../../Controllers/Productos/getFavoritesController");

const getFavoritesHandler = async (req, res) => {
  try {
    const userId = req.userId;

    const products = await getFavoritesController(userId);
    if (!products)
      throw new Error("El usuario no tiene productos en favoritos.");

    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getFavoritesHandler;
