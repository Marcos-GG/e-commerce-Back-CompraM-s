const postGenderController = require("../../Controllers/Gender/postGender");

const postGenderHandler = async (req, res) => {
  try {
    const { gender } = req.body;

    if (gender) {
      const newGender = await postGenderController(gender);
      if (!newGender) throw new Error("No se pudo crear la nueva categoria");

      return res.status(200).json(newGender);
    }
    throw new Error("No se paso el nuevo genero");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = postGenderHandler;
