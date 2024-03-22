const postProductController = require("../../Controllers/Productos/postProduct");

const postProductHandler = async (req, res) => {
  try {
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
      // stock,
    } = req.body;

    if (!title || !image1 || !description || !price || !gender || !category)
      throw new Error("Campos incompletos para la creación.");

    const postProduct = await postProductController({
      title,
      image1,
      image2,
      image3,
      image4,
      description,
      price,
      gender,
      category,
      // stock,
    });

    if (!postProduct) throw new Error("No se pudo crear la publicación");

    return res.status(200).json(postProduct);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = postProductHandler;
