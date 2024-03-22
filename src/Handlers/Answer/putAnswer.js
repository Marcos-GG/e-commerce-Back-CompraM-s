const putAnswerController = require("../../Controllers/Answer/putAnswer");

const putAnswerHandler = async (req, res) => {
  try {
    const { id, answer, commentId } = req.body;

    if (!id || !answer || !commentId)
      throw new Error("Faltan datos para modificar el comentario");

    const updateAnswer = await putAnswerController({ id, answer });

    return res.status(200).json(updateAnswer);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = putAnswerHandler;
