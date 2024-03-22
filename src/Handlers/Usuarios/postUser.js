const createUserController = require("../../Controllers/Usuarios/postUser");

const createUserHandler = async (req, res) => {
  try {
    const { name, email, lastname, password, DNI, phone, birthDate } = req.body;

    if (
      !name ||
      !email ||
      !lastname ||
      !password ||
      !DNI ||
      !phone ||
      !birthDate
    )
      throw new Error("Datos incompletos para crear el usuario");

    const userFnController = await createUserController({
      name,
      email,
      lastname,
      password,
      DNI,
      phone,
      birthDate,
    });

    if (!userFnController) throw new Error("No se pudo crear el usuario");

    return res.status(200).json(userFnController);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = createUserHandler;
