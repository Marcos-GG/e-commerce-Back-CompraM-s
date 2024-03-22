const deleteUserController = require("../../Controllers/Usuarios/deleteUser");

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const deleteUser = await deleteUserController(id);

      if (!deleteUser) throw new Error("No existe usuario con ese id");

      return res.status(200).json(deleteUser);
    } else {
      throw new Error("No se proporcionó un ID válido");
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = deleteUserHandler;
