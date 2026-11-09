const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Productos = require('../models/productos.model');
const Categorias = require('../models/categorias.model');
const protect = require('../middleware/auth.middleware');
const productosModel = require('../models/productos.model');
const router = express.Router();

router.get('/', async (req, res) => {

    try {

        const productos = await Productos.find().populate('categorias');
        if (productos.length === 0) {
            return res.status(404).json({
                msj: 'No hay productos registrados'
            });
        }

        res.json(productos);

    } catch (error) {

        res.status(500).json({
            msj: 'Error al obtener los productos: ' + error.message
        });

    }

});

router.get('/:id', async (req, res) => {
    try {
        const producto = await Productos.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                msj: 'Producto no encontrado'
            });
        }

        await Productos.findById(req.params.id);

        res.json(producto);

    } catch (error) {
        res.status(400).json({
            msj: 'Error al encontrar el producto: ' + error.message
        });
    }
});


router.post('/', async (req, res) => {
    try {
        const { nombre, categorias, tallas, descripcion, precio, imagen } = req.body;

        if (!nombre || !categorias || !tallas || !descripcion || !precio || !imagen) {
            return res.status(400).json({
                msj: 'Nombre, categorias, tallas, descripcion, precio e imagen son requeridos'
            });
        }

        const nombreExistente = await Productos.findOne({ nombre });
        if (nombreExistente) {
            return res.status(400).json({
                msj: 'Ya existe un producto registrado con ese nombre'
            });
        }

        const categoriasEncontradas = await Categorias.find({
            $or: categorias.map(c => ({ genero: c.genero, tipo: c.tipo }))
        });

        if (categoriasEncontradas.length !== categorias.length) {
            return res.status(400).json({
                msj: 'Una o más categorías no existen'
            });
        }

        const categoriasIds = categoriasEncontradas.map(cat => cat._id);

        const nuevoProducto = new Productos({
            nombre,
            categorias: categoriasIds,
            tallas,
            descripcion,
            precio,
            imagen
        });

        await nuevoProducto.save();

        res.status(201).json({
            msj: 'Producto registrado correctamente',
            producto: nuevoProducto
        });

    } catch (error) {
        res.status(500).json({
            msj: 'Error al registrar el producto: ' + error.message
        });
    }
});

router.put('/:id', protect, async (req, res) => {
    try {
        const { nombre, categorias, tallas, descripcion, precio, imagen } = req.body;

        const producto = await Productos.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                msj: 'Producto no encontrado'
            });
        }

        let categoriasIds = producto.categorias;

        if (categorias && categorias.length > 0) {

            const categoriasEncontradas = await Categorias.find({
                $or: categorias.map(c => ({
                    genero: c.genero,
                    tipo: c.tipo
                }))
            });

            if (categoriasEncontradas.length !== categorias.length) {
                return res.status(400).json({
                    msj: 'Una o más categorías no existen'
                });
            }

            categoriasIds = categoriasEncontradas.map(cat => cat._id);
        }

        producto.nombre = nombre || producto.nombre;
        producto.categorias = categoriasIds;
        producto.tallas = tallas || producto.tallas;
        producto.descripcion = descripcion || producto.descripcion;
        producto.precio = precio || producto.precio;
        producto.imagen = imagen || producto.imagen;

        await producto.save();

        const productoActualizado = await Productos
            .findById(producto._id)
            .populate('categorias');

        res.status(200).json({
            msj: 'Producto actualizado correctamente',
            producto: productoActualizado
        });

    } catch (error) {
        res.status(500).json({
            msj: 'Error al actualizar el producto: ' + error.message
        });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const producto = await Productos.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                msj: 'Producto no encontrado'
            });
        }

        await Productos.findByIdAndDelete(req.params.id);

        res.status(200).json({
            msj: 'Producto eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            msj: 'Error al eliminar el producto: ' + error.message
        });
    }
});

module.exports = router;