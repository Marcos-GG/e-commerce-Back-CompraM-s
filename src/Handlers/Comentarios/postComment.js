const postCommentController = require("../../Controllers/Comentarios/postComment");

const postCommentHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, text } = req.body;

    if (!text) throw new Error("Campo imcompleto");

    const createComment = await postCommentController({
      userId,
      productId,
      text,
    });

    return res.status(200).json(createComment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postCommentHandler;
