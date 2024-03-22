const postAnswerController = require("../../Controllers/Answer/postAnswer");

const postAnswerHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const { commentId, answer } = req.body;

    if (!answer) throw new Error("Campo imcompleto");

    const createAnswer = await postAnswerController({
      userId,
      commentId,
      answer,
    });

    return res.status(200).json(createAnswer);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postAnswerHandler;
