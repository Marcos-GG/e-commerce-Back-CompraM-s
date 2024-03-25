const { User, Comment, Answer } = require("../../db");

const getCommentController = async (id) => {
  if (id) {
    const idComment = await Comment.findByPk(id, {
      include: [
        { model: User, attributes: ["name", "lastname", "active"] },
        {
          model: Answer,
          include: {
            model: User,
            attributes: ["name", "lastname", "admin", "active"],
          },
        },
      ],
    });

    return idComment;
  }

  const allComments = await Comment.findAll({
    include: [
      { model: User, attributes: ["name", "lastname", "admin", "active"] },
      {
        model: Answer,
        include: {
          model: User,
          attributes: ["name", "lastname", "admin", "active"],
        },
      },
    ],
  });

  return allComments;
};

module.exports = getCommentController;
