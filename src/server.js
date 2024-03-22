const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./Routes/index");
const cookieParser = require("cookie-parser");
const autenticarToken = require("./Handlers/Auth/autenticarToken");

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());

// proteccion de rutas .
// originalUrl viene de express
//--------Proteccion de rutas-----------------
//middleware para proteccion de rutas
server.use((req, res, next) => {
  if (
    req.originalUrl.includes("/webhook") ||
    req.originalUrl === "/login" ||
    req.originalUrl === "/register"
  ) {
    next(); // Si la ruta es /login, /register no se necesita autenticación
  } else {
    autenticarToken(req, res, (error) => {
      if (error) {
        // Aquí, maneja la respuesta si la autenticación falla o el token es inválido
        console.error("Error de autenticación:", error);

        // Redirige al usuario a la página de inicio de sesión
        return res.redirect("/login");
      }
      // Si la autenticación es exitosa, continúa con la solicitud
      next();
    });
  }
});

server.use("/", routes);

module.exports = server;
