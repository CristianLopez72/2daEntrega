//Importo Librerias a utilizar
import { Router } from "express";
const router = Router();

import {
  getAllProductos,
  getProductoById,
  crearProducto,
  updateProductoById,
  deleteProductoById,
} from "../controller/productos.js";
import { body } from "express-validator";

router.get("/", getAllProductos);

router.get("/:id", getProductoById);

router.post(
  "/",
  body("nombre").not().isEmpty().isString().trim().escape(),
  body("categoria").not().isEmpty().isString().trim().escape(),
  body("codigo").not().isEmpty().isString().trim().escape(),
  body("foto").not().isEmpty().isString().trim(),
  body("precio").not().isEmpty().isDecimal({ min: 1.0 }),
  body("stock").not().isEmpty().isInt({ min: 1 }),
  crearProducto
);

router.put(
  "/:id",
  body("nombre").not().isEmpty().isString().trim().escape(),
  body("categoria").not().isEmpty().isString().trim().escape(),
  body("codigo").not().isEmpty().isString().trim().escape(),
  body("foto").not().isEmpty().isString().trim(),
  body("precio").not().isEmpty().isDecimal({ min: 1.0 }),
  body("stock").not().isEmpty().isInt({ min: 1 }),
  updateProductoById
);

router.delete("/:id", deleteProductoById);

export default router;