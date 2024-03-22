const { Router } = require("express");
// Importacion de los handlers

// handler payment
const paymentHandler = require("../Handlers/Productos/paymentHandler");
const handlerCompras = require("../Handlers/Productos/handlerCompras");

/// handlers Users
const createUserHandler = require("../Handlers/Usuarios/postUser");
const getUserHandler = require("../Handlers/Usuarios/getUser");
const putUserHandler = require("../Handlers/Usuarios/putUser");
const deleteUserHandler = require("../Handlers/Usuarios/deleteUsers");

// handlers Products
const postProductHandler = require("../Handlers/Productos/postProduct");
const getProductHandler = require("../Handlers/Productos/getProduct");
const putProductHandler = require("../Handlers/Productos/putProduct");
const deleteProductHandler = require("../Handlers/Productos/deleteProduct");
const handlerApplyFilters = require("../Handlers/Productos/handlerFilterProducts");

// handlers likes
const postLikeHandler = require("../Handlers/Like/postLikeHandler");
const removeLikeHandler = require("../Handlers/Like/removeLikeHandler");

// handlers Categories
const getCategoryHandler = require("../Handlers/Categorias/getCategory");
const postCategoryHandler = require("../Handlers/Categorias/postCategory");
const putCategoryHandler = require("../Handlers/Categorias/putCategory");

// handlers Comments
const postCommentHandler = require("../Handlers/Comentarios/postComment");
const deleteCommentHandler = require("../Handlers/Comentarios/deleteComment");
const putCommentHandler = require("../Handlers/Comentarios/putComment");
const getCommentHandler = require("../Handlers/Comentarios/getComment");

// handlers Answer
const postAnswerHandler = require("../Handlers/Answer/postAnswer");
const deleteAnswerHandler = require("../Handlers/Answer/deleteAnswer");
const putAnswerHandler = require("../Handlers/Answer/putAnswer");

// handler Gender
const getGenderHandler = require("../Handlers/Gender/getGender");
const postGenderHandler = require("../Handlers/Gender/postGender");

//handler login
const loginHandler = require("../Handlers/Login/loginHandler");
const getFavoritesHandler = require("../Handlers/Productos/getFavorites");
const CompraFinalizada = require("../Handlers/Email/HandlerCompraFinalizada");
const webhookHandler = require("../Handlers/Productos/webHooksHandler");

// Email

const router = Router();

//Email
router.post("/compra", CompraFinalizada);

//
router.post("/createPreference", paymentHandler);
router.post("/webhook", webhookHandler);
router.get("/compras", handlerCompras);

//login
router.post("/login", loginHandler);

// users
router.get("/users/:id", getUserHandler);
router.post("/register", createUserHandler);
router.delete("/users/:id", deleteUserHandler);
router.get("/users", getUserHandler);
router.put("/users/:id", putUserHandler);

// products
router.get("/products/:id", getProductHandler);
router.post("/createProduct", postProductHandler);
router.get("/products/", getProductHandler);
router.put("/products/:id", putProductHandler);
router.delete("/products/:id", deleteProductHandler);
router.post("/filters", handlerApplyFilters);
// router.get("/relacionados/:id", getRelacionadoHandler);

//likes
router.post("/likes", postLikeHandler);
router.put("/likes", removeLikeHandler);
router.get("/likes/getFavorites", getFavoritesHandler);

//Category
router.get("/categories", getCategoryHandler);
router.get("/category?", getCategoryHandler);
router.post("/category", postCategoryHandler);
router.put("/category", putCategoryHandler);

// comments
router.post("/comments", postCommentHandler);
router.delete("/comments/:id", deleteCommentHandler);
router.put("/comments/:id", putCommentHandler);
router.get("/comments", getCommentHandler);
router.get("/comments/:id", getCommentHandler);

// answer
router.post("/answer", postAnswerHandler);
router.delete("/answer/:id", deleteAnswerHandler);
router.put("/answer", putAnswerHandler);

// Gender
router.get("/gender?", getGenderHandler);
router.post("/gender", postGenderHandler);
router.get("/gender", getGenderHandler);

module.exports = router;
