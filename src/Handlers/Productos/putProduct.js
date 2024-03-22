const putProductController = require("../../Controllers/Productos/putProduct");

const putProductHandler = async (req, res) => {
  try {
    const { id } = req.params; // id de la publicacion

    // nueva info de la publicación
    const {
      title,
      image1,
      image2,
      image3,
      image4,
      description,
      price,
      gender,
      category,
      status,
    } = req.body;

    const updatepost = await putProductController(id, {
      title,
      image1,
      image2,
      image3,
      image4,
      description,
      price,
      gender,
      category,
      status,
    });

    if (!updatepost) throw new Error("No se pudo actualizar la publicación");

    return res.status(200).json(updatepost);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = putProductHandler;
