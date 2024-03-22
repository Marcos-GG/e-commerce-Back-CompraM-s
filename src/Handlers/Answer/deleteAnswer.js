const deleteAnswerController = require("../../Controllers/Answer/deleteAnswer");

const deleteAnswerHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAnswer = await deleteAnswerController(id);

    if (!deletedAnswer)
      throw new Error("No se ha podido eliminar el comentario.");

    res.status(200).send({
      message: "Comentario eliminado correctamente",
      data: deletedAnswer,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = deleteAnswerHandler;
