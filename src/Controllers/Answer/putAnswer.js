const { Answer } = require("../../db");

const putAnswerController = async ({ id, answer }) => {
  if (id) {
    const AnswerActual = await Answer.findByPk(id);
    if (!AnswerActual) throw new Error("Comentario no encontrado");

    AnswerActual.answer = answer;

    await AnswerActual.save();
    return { AnswerActual, message: "actualizado correctamente" };
  }
};
module.exports = putAnswerController;
