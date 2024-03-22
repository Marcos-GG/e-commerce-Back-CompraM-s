const { User } = require("../../db");
const { Op } = require("sequelize");
const bycrypt = require("bcryptjs");

const createUserController = async (userData) => {
  const checkUserExist = await User.findOne({
    where: {
      [Op.or]: [{ email: userData.email }, { DNI: userData.DNI }],
    },
  });

  if (checkUserExist) throw new Error("El usuario ya existe");

  // encrypt la contraseña
  const contraseñaEncrypt = await bycrypt.hash(userData.password, 10);

  userData.password = contraseñaEncrypt;

  const newUser = await User.create(userData);

  return newUser;
};

module.exports = createUserController;
