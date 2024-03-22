const jwt = require("jsonwebtoken");
const { User } = require("../../db");
require("dotenv").config();

const rutasDeAdmin = ["/createProduct"];

const autenticarToken = async (req, res, next) => {
  //obtengo el authorization que se envia por el header de la solicitud en formato Bearer token
  const { authorization } = req.headers;
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    // extrae,os de la cadena a apartir de la posicion 7
    token = authorization.substring(7);
  }

  if (!token)
    return res.status(401).json({ error: "token faltante o invalido" });

  try {
    // Valido el token con la clave privada almacenada en las variables de entorno
    let decodenToken = await jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodenToken.id; // Extraigo el ID del token y lo guardo en el req para usarlo en el manejador de ruta que se ejecuta después del middleware

    const url = req.originalUrl.replace(req.baseUrl, "");

    if (rutasDeAdmin.includes(url)) {
      const permiso = await User.findByPk(decodenToken.id);

      if (!permiso.admin)
        return res.status(401).json({ error: "No autorizado no es admin" });
    }

    if (decodenToken) {
      next(); // Ejecuta la siguiente función del enrutador
    }
  } catch (error) {
    return res.status(401).json({ error: "Error en la validación del token" });
  }
};

module.exports = autenticarToken;
