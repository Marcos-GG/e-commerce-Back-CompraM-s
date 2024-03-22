const { Comment } = require("../../db");

const deleteCommentController = async (id) => {
  const comment = await Comment.destroy({
    where: { id: id },
  });

  if (!comment)
    throw new Error("No se encontro comentario con ese id para borrar");

  return comment;
};

module.exports = deleteCommentController;
