const compraFinalizada = require("../../Email/CompraFinalizada");
const { User } = require("../../db");

const CompraFinalizada = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findByPk(userId);

    compraFinalizada(user.name, user.email);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = CompraFinalizada;
