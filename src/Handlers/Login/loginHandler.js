const loginController = require("../../Controllers/Login/loginController");

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error("Datos incompletos");

    const token = await loginController(email, password);

    if (!token) throw new Error("El usuario ya existe");

    return res
      .status(200)
      .json({ message: "Inicio de sesión exitoso", token: token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = loginHandler;
