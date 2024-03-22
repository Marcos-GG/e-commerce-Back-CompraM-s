const server = require("./src/server");
const { conn } = require("./src/db");

const PORT = process.env.DB_PORT;

conn
  .sync({ force: false })
  .then(() => {
    server.listen(PORT, () => {
      `server conectado a base de datos, puerto ${PORT}`;
    });
  })
  .catch((error) => console.error(error));
