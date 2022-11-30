//Importo Librerias a utilizar
import mongoose from "mongoose";

const connectionString =
     process.env.MONGO_ATLAS_SRV || "mongodb+srv://cristian:cris2022@ecommerce.ndh4rfm.mongodb.net/test";
export const initMongoDB = async () => {
  try {
    console.log("CONECTANDO A MI BASE DE DATOS MONGO");
    console.log(connectionString);
    await mongoose.connect(connectionString);

    console.log("CONEXION EXITOSA");
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};