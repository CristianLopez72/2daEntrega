//importo librerias a utilizar
import Router from "express";
import productosRouter from "./productos.js";
import carritoRouter from "./carrito.js";

const router = Router();

router.use("/productos", productosRouter);
router.use("/carrito", carritoRouter);

export default router;