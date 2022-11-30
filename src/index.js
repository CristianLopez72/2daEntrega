//Importo Librerias a utilizar
import "dotenv/config";
import Server from "./services/server.js";
import { initMongoDB } from "./services/database.js";

const inicio = async () => {
  await initMongoDB();
  const puerto = 8080;

  Server.listen(puerto, () => console.log(`Servidor Escuchando en el puerto ${puerto}`));

  Server.on("error", (error) => {
    console.log("Catch de error en servidor!", error);
  });
};

inicio();