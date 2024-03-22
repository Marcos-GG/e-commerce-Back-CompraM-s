const putCommentController = require("../../Controllers/Comentarios/putComment");

const putCommentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!id || !text) throw new Error("falta informacion");
    else {
      const updateComment = await putCommentController(id, text);

      if (!updateComment)
        throw new Error("No se pudo actualizar el comentario");

      return res.status(200).json(updateComment);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = putCommentHandler;
