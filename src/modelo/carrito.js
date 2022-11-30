//Importo Librerias a utilizar
import mongoose from "mongoose";
import { productosSchema } from "./productos.js";

export const carritoCollectionName = "carritos";

export const carritoSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  timestamp: { type: String, required: true },
  productos: { type: [productosSchema], required: true },
});

export const CarritoModelo = mongoose.model(carritoCollectionName, carritoSchema);