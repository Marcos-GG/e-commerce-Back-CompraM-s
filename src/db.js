require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "e_commerce",
  port: process.env.DB_PORT || 3000,
  password: process.env.DB_PASSWORD || "123456",
  dialect: "mysql",
  logging: false,
});

const basename = path.basename(__filename);

// Lectura y carga dinámica de modelos desde la carpeta 'models'
const modelDefiners = [];

//usamos filesystem para extraer de la carpeta models el nombre de cada modelo y pushearlo al array modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos que estan en el Array modelDefiners
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);

let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  Products,
  Like,
  User,
  Category,
  Comment,
  Answer,
  Gender,
  Compras,
  CompraProducto,
} = sequelize.models;

// Products.belongsTo(Category, { foreignKey: "category" });
// Category.hasMany(Products, { foreignKey: "category" });

// relaciones de likes
Like.belongsTo(Products, { foreignKey: "productId", onDelete: "CASCADE" });
Like.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Products.hasMany(Like, { foreignKey: "productId", onDelete: "CASCADE" });

// relaciones de comments
Products.hasMany(Comment, { foreignKey: "productId", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Comment.belongsTo(Products, { foreignKey: "productId", onDelete: "CASCADE" });

// relaciones de Answer
Comment.hasMany(Answer, { foreignKey: "commentId", onDelete: "CASCADE" });
Answer.belongsTo(Comment, { foreignKey: "commentId", onDelete: "CASCADE" });
Answer.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

Products.belongsTo(Gender, { foreignKey: "genderId" });
Gender.hasMany(Products, { foreignKey: "genderId" });

Products.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Products, { foreignKey: "categoryId" });

// relaciones de Compras
User.hasMany(Compras, { foreignKey: "comprasId" });
Compras.belongsTo(User, { foreignKey: "comprasId" });

CompraProducto.belongsTo(Compras, { foreignKey: "id_compra" });
CompraProducto.belongsTo(Products, { foreignKey: "id_producto" });

Products.hasMany(CompraProducto, { foreignKey: "id_producto" });
Compras.hasMany(CompraProducto, { foreignKey: "id_compra" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { pool } = require('./db.js');
};
