const postLikeController = require("../../Controllers/Like/postLikeController");

const postLikeHandler = async (req, res) => {
  try {
    // Obtener los parámetros necesarios del cuerpo de la solicitud

    const { productId } = req.body;
    const userId = req.userId;

    // Verificar si se recibieron los parámetros necesarios
    if (!userId || !productId) {
      throw new Error("No se recibieron los parametros necesarios");
    }

    const like = await postLikeController({ productId, userId });

    return res.status(200).json(like);
  } catch (error) {
    // En caso de error, imprimir el mensaje de error en la consola

    res.status(500).send({ error: error.message });
  }
};

module.exports = postLikeHandler;
