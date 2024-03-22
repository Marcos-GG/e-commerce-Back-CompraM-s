const putUserController = require("../../Controllers/Usuarios/putUser");

const putUserHandler = async (req, res) => {
  try {
    const { id } = req.params; // id de la publicacion

    // nueva info de la publicación
    const {
      name,
      lastname,
      email,
      phone,
      active,
      birthDate,
      DNI,
      password,
      passwordConfirmation,
    } = req.body;

    const updateUser = await putUserController(id, {
      name,
      lastname,
      email,
      phone,
      active,
      birthDate,
      DNI,
      password,
      passwordConfirmation,
    });

    if (!updateUser) throw new Error("No se pudo actualizar el usuario");

    return res.status(200).json(updateUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = putUserHandler;
