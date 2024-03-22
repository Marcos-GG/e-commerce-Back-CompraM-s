const removeLikeController = require("../../Controllers/Like/removeLikeController");

// Controlador para manejar la eliminación de un "me gusta" de una publicación

const removeLikeHandler = async (req, res) => {
  try {
    // Obtener el ID del usuario desde la información de autenticación
    const { productId } = req.body;
    const userId = req.userId;

    // Obtener el ID de la publicación desde el cuerpo de la solicitud
    // const userId = req.userId;

    // Verificar si se recibieron los parámetros necesarios

    if (!userId || !productId) {
      throw new Error("No se recibieron los parametros necesarios");
    }

    // Llamar a la función de controlador que realiza la eliminación del "me gusta"
    const like = await removeLikeController({ productId, userId });

    // Enviar una respuesta con el estado 200 (éxito) y los datos relevantes

    return res.status(200).json({ like, userId });
  } catch (error) {
    // En caso de error, enviar una respuesta de error al cliente con el estado 500 y el mensaje de error

    res.status(500).send(error.message);
  }
};

module.exports = removeLikeHandler;
