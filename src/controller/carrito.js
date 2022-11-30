//Importo Librerias a utilizar
import { CarritoModelo } from "../modelo/carrito.js";
import { ProductosModelo } from "../modelo/productos.js";
import { validationResult } from "express-validator";
import { formatTimeStamp } from "../util/format.js";
import { findLastCartId } from "../util/util.js";

export const getProductosenCarrito = async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "El id no es válido!",
      });
    }
    const id = parseInt(req.params.id);

    const carrito = await CarritoModelo.findOne({ id: id });

    if (!carrito) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    } else {
      return res.status(200).json({
        data: carrito,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const crearCarrito = async (req, res) => {
  try {
    let lastId = await findLastCartId();
    let newId = lastId + 1;
    let id = newId;
    let timestamp = formatTimeStamp();
    let productos = [];

    await CarritoModelo.create({
      id,
      timestamp,
      productos,
    });

    return res.status(201).json({
      mensaje: `carrito ${lastId} creado con exito`,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const addProductosalCarrito = async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "El id de carrito no es válido!",
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const carritoId = parseInt(req.params.id);
    const productoId = parseInt(req.body.id);

    let carrito = await CarritoModelo.findOne({ id: carritoId });

    if (!carrito) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    }

    let producto = await ProductosModelo.findOne({ id: productoId });

    let productos = carrito.productos;
    productos.push(producto);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      const productoAddedToCarrito = await CarritoModelo.findByIdAndUpdate(
        carrito._id,
        { productos },
        { new: true }
      );

      return res.status(201).json({
        mensaje: "producto agregado al carrito",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleteCarritoById = async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "El id de carrito no es válido!",
      });
    }
    const id = parseInt(req.params.id);
    let carrito = await CarritoModelo.findOne({ id: id });

    if (!carrito) {
      return res.status(404).json({
        mensaje: "carrito no encontrado!",
      });
    } else {
      await CarritoModelo.findByIdAndDelete(carrito._id);
      return res.status(200).json({
        mensaje: "carrito eliminado con exito",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleteProductoenCarritoById = async (req, res) => {
  try {
    if (isNaN(req.params.id) || isNaN(req.params.id_prod)) {
      return res.status(400).json({
        error: "Los parametros no son válidos!",
      });
    }
    const carritoId = parseInt(req.params.id);
    const productoId = parseInt(req.params.id_prod);

    let carrito = await CarritoModelo.findOne({ id: carritoId });

    if (!carrito) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    }

    let productoExiste = carrito.productos.find((item) => item.id == productoId);

    if (!productoExiste) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      let productos = carrito.productos;
      const filteredProductos = productos.filter((item) => item.id !== productoId);
      products = filteredProductos;

      const productoAddedToCarrito = await CarritoModelo.findByIdAndUpdate(carrito._id, {
        productos,
      });

      return res.status(201).json({
        mensaje: "producto eliminado del carrito",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};