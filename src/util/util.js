//Importo Librerias a utilizar
import { ProductosModelo } from "../modelo/productos.js";
import { CarritoModelo } from "../modelo/carrito.js";

export const findLastProductId = async () => {
  let lastDocument = await ProductosModelo.findOne().sort({ id: -1 }).limit(1);
  let lastId = lastDocument.id;
  return lastId;
};

export const findLastCartId = async () => {
  let lastDocument = await CarritoModelo.findOne().sort({ id: -1 }).limit(1);
  let lastId = lastDocument.id;
  return lastId;
};