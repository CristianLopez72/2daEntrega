//Importo Librerias a utilizar
import { ProductosModelo } from "../modelo/productos.js";
import { validationResult } from "express-validator";
import { formatTimeStamp } from "../util/format.js";
import { findLastProductId } from "../util/util.js";

export const getAllProductos = async (req, res) => {
  try {
    let productos = await ProductosModelo.find();
    res.status(200).json({
      data: productos,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getProductoById = async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }
    const id = parseInt(req.params.id);
    let producto = await ProductosModelo.findOne({ id: id });
    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      return res.status(200).json({
        data: producto,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, categoria, codigo, foto, precio, stock } = req.body;

    let lastId = await findLastProductId();
    let newId = lastId + 1;
    let id = newId;
    let timestamp = formatTimeStamp();

    const newProducto = await ProductosModelo.create({
      id,
      timestamp,
      nombre,
      categoria,
      codigo,
      foto,
      precio,
      stock,
    });
    return res.status(201).json({
      data: newProducto,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const updateProductoById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }

    const id = parseInt(req.params.id);
    const { nombre, categoria, codigo, foto, precio, stock } = req.body;

    let producto = await ProductosModelo.findOne({ id: id });

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      const productoUpdated = await ProductosModelo.findByIdAndUpdate(
        producto._id,
        { nombre, categoria, codigo, foto, precio, stock },
        { new: true }
      );
      return res.status(200).json({
        mensaje: "producto actualizado con exito",
        data: productUopdated,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleteProductoById = async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }
    const id = parseInt(req.params.id);

    let producto = await ProductosModelo.findOne({ id: id });

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      await ProductosModelo.findByIdAndDelete(producto._id);
      return res.status(200).json({
        mensaje: "producto eliminado con exito",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};