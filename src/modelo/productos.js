//Importo Librerias a utilizar
import mongoose from "mongoose";

export const productosCollectionName = "productos";

export const productosSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  timestamp: { type: String, required: true },
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  codigo: { type: String, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export const ProductosModelo = mongoose.model(
  productosCollectionName,
  productosSchema
);