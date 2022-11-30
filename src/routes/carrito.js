//Importo Librerias a utilizar
import { Router } from "express";
const router = Router();

import {
  getProductosenCarrito,
  crearCarrito,
  addProductosalCarrito,
  deleteCarritoById,
  deleteProductoenCarritoById,
} from "../controller/carrito.js";
import { body } from "express-validator";

router.get("/:id/productos", getProductosenCarrito);
router.post("/", crearCarrito);
router.post(
  "/:id/productos",
  body("id").not().isEmpty().isInt({ min: 1 }),
  addProductosalCarrito
);
router.delete("/:id", deleteCarritoById);
router.delete("/:id/productos/:id_prod", deleteProductoenCarritoById);

export default router;