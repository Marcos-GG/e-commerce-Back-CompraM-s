const { User, Comment } = require("../../db");

const deleteUserController = async (id) => {
  const user = await User.findByPk(id);

  if (user) {
    const comentariosAsociados = await Comment.findAll({
      where: { userId: user.id },
    });

    if (comentariosAsociados.length > 0) {
      await Comment.destroy({
        where: { userId: user.id },
      });
    }

    await User.destroy({
      where: { id: id },
    });
  }

  if (!user) {
    return { deletedRows: 0, message: "User not found" };
  }
  return { deletedRows: user, message: "User deleted successfully" };
};

module.exports = deleteUserController;
