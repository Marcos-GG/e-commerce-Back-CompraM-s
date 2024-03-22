const deleteCommentController = require("../../Controllers/Comentarios/deleteComment");

const deleteCommentHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No se pudo borrar el comentario por falta de id");

    const deleteComment = await deleteCommentController(id);

    return res.status(200).json(deleteComment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteCommentHandler;
