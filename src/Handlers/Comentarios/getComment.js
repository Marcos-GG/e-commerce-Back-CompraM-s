const getCommentController = require("../../Controllers/Comentarios/getComment");

const getCommentHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const idComment = await getCommentController(id);
      if (!idComment) throw new Error("El producto no existe");

      return res.status(200).json(idComment);
    }

    const allComment = await getCommentController();
    if (allComment.length === 0) throw new Error("No existen comentarios");

    return res.status(200).json(allComment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getCommentHandler;
