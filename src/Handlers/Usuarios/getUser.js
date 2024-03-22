const getUserController = require("../../Controllers/Usuarios/getUser");

const getUserHandler = async (req, res) => {
  try {
    const { search } = req.query;
    const { id } = req.params;
    const ID = isNaN(id);
    if (ID) {
      const userId = await getUserController(id, search);
      if (!userId) throw new Error("No se encontro ususario con ese id");

      return res.status(200).json(userId);
    }

    if (search) {
      const users = await getUserController(id, search);
      if (!users)
        throw new Error(
          "No se encontraron usuarios con la información ingresada"
        );

      return res.status(200).json(users);
    }

    const getAllUsers = await getUserController();

    if (getAllUsers.length === 0) throw new Error("No existen usuarios");

    return res.status(200).json(getAllUsers);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getUserHandler;
