const { Comment } = require("../../db");

const postCommentController = async ({ userId, productId, text }) => {
  const createComment = await Comment.create({
    userId,
    productId,
    text,
  });
  if (!createComment) throw new Error("No se pudo crear el comentario");

  return createComment;
};

module.exports = postCommentController;
