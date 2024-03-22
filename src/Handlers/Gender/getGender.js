const getGenderController = require("../../Controllers/Gender/getGender");

const getGenderHandler = async (req, res) => {
  try {
    const { gender } = req.query;

    if (gender) {
      const idGender = await getGenderController(gender);
      if (!idGender) throw new Error("No hay productos con esa categoria");

      return res.status(200).json(idGender);
    }

    const allGenders = await getGenderController();
    if (!allGenders) throw new Error("No hay categorias");

    return res.status(200).json(allGenders);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getGenderHandler;
