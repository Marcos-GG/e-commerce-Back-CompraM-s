const { Comment } = require("../../db");

const putCommentController = async (id, text) => {
  const commentActual = await Comment.findByPk(id);

  if (!commentActual) throw new Error("No se encontro comentario con ese id");

  commentActual.text = text;

  await commentActual.save();

  return commentActual;
};

module.exports = putCommentController;
