const { Answer } = require("../../db");

const deleteAnswerController = async (id) => {
  if (id) {
    const deletedAnswer = await Answer.destroy({ where: { id: id } });

    if (deletedAnswer === 0) {
      throw new Error("No se pudo borrar la Answer");
    }

    return { deletedAnswer, message: "Answer borrado exitosamente" };
  } else {
    throw new Error("Id de answer requerido.");
  }
};

module.exports = deleteAnswerController;
