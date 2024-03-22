const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const loginController = async (email, password) => {
  try {
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) throw new Error("El usuario no esta registrado.");

    // comparamos las contraseñas para ver si es valido/correcta y esta en la base de datos
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new Error("contraseña incorrecta.");

    if (!user.active) throw new Error("El usuario esta bloqueado!");

    //si es valido generamos token JWT
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "8h",
    });

    return { token, admin: user.admin, user: user.name };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = loginController;
