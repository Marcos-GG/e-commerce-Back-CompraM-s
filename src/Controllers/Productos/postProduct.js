const { Products } = require("../../db");
const { Op } = require("sequelize");

const postProdcutController = async (data) => {
  const checkProductExist = await Products.findOne({
    where: {
      [Op.and]: [{ title: data.title }, { price: data.price }],
    },
  });

  if (checkProductExist) throw new Error("El producto ya existe");
  const newProduct = await Products.create(data);

  return newProduct;
};

module.exports = postProdcutController;
