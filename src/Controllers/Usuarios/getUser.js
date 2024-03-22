const { Op } = require("sequelize");
const { User } = require("../../db");

const getUserController = async (id, search) => {
  if (id) {
    const userId = await User.findByPk(id);

    return userId;
  }

  if (search) {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `${search}%`,
            },
          },
          {
            lastname: {
              [Op.like]: `${search}%`,
            },
          },
        ],
      },
    });

    return users;
  }

  const allUsers = await User.findAll();
  if (allUsers.length === 0) throw new Error("No hay usuarios");

  return allUsers;
};

module.exports = getUserController;
