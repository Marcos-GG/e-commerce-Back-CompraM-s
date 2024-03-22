const { Gender } = require("../../db");

const postGenderController = async (gender) => {
  const existence = await Gender.findOne({
    where: { gender: gender },
  });

  if (existence) {
    throw new Error("El género ya existe");
  } else {
    const newGender = await Gender.create({
      gender: gender,
    });
    return newGender;
  }
};

module.exports = postGenderController;
