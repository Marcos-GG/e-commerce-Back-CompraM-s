const { User } = require("../../db");

const putUserController = async (id, UserData) => {
  const user = await User.findByPk(id);

  if (!user) throw new Error("Usuario no encontrado");

  user.name = UserData.name;
  user.lastname = UserData.lastname;
  user.email = UserData.email;
  user.phone = UserData.phone;
  user.DNI = UserData.DNI;
  user.birthDate = UserData.birthDate;
  user.active = UserData.active;
  user.password = UserData.password;
  user.passwordConfirmation = UserData.passwordConfirmation;

  await user.save();

  return user;
};

module.exports = putUserController;
