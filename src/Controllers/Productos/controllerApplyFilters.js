const { Products, Like } = require("../../db");
const { Sequelize } = require("sequelize");

const controllerApplyFilters = async ({
  price,
  gender,
  category,
  morePopular,
  page,
}) => {
  let pageSize = 10;
  let offset = (page - 1) * pageSize;

  const filtrosQueNoSonNull = {};

  if (gender !== null) filtrosQueNoSonNull.gender = gender;
  if (category !== null) filtrosQueNoSonNull.category = category;
  if (price !== null && typeof price === "object") {
    if (price.min !== null || price.max !== null) {
      filtrosQueNoSonNull.price = {};

      if (price.min !== null) {
        filtrosQueNoSonNull.price[Sequelize.Op.gte] = price.min;
      }

      if (price.max !== null) {
        filtrosQueNoSonNull.price[Sequelize.Op.lte] = price.max;
      }
    }
  }

  // Array vacío para las opciones de ordenamiento
  let orderOptions = [];
  if (morePopular) {
    // Agregar la opción de ordenar por 'likes' de mayor a menor si morePopular es true
    orderOptions.push(["likes", "DESC"]);
  }

  const productosFiltrados = await Products.findAll({
    where: { ...filtrosQueNoSonNull, status: true },
    include: { model: Like },
    order: orderOptions, // Aplicar opciones de ordenamiento
    offset,
    limit: pageSize,
  });

  if (productosFiltrados.length === 0)
    throw new Error("No se encontraron productos con los filtros aplicados");

  console.log(productosFiltrados.length, "filtrado");
  return { productosFiltrados, totalProducts: productosFiltrados.length };
};

module.exports = controllerApplyFilters;
