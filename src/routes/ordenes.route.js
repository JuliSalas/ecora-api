const express = require('express');
const Ordenes = require('../models/ordenes.model');
const Usuario = require('../models/usuariosEcora.model');
const Productos = require('../models/productos.model');
const protect = require('../middleware/auth.middleware');
const { sendFacturaEmail } = require('../services/email.service')

const router = express.Router();


// Listar todas las órdenes
router.get('/', protect, async (req, res) => {

    try {

        const ordenes = await Ordenes.find()
            .populate('productosOrden.productos')
            .populate('clienteAsociado.cliente');

        res.status(200).json(ordenes);

    } catch (error) {

        res.status(500).json({
            msj: 'Error al obtener las órdenes: ' + error.message
        });

    }

});


// Crear una orden
router.post('/', protect, async (req, res) => {

    try {

        const {
            productos,
            estado,
            total
        } = req.body;


        if (!productos || productos.length === 0 || !total) {

            return res.status(400).json({
                msj: 'Productos y total son requeridos'
            });

        }


        const usuario = await Usuario.findById(
            req.usuario._id
        );


        if (!usuario) {

            return res.status(404).json({
                msj: 'Usuario no encontrado'
            });

        }


        const productosEncontrados = await Productos.find({
            _id: {
                $in: productos
            }
        });


        if (productosEncontrados.length !== productos.length) {

            return res.status(400).json({
                msj: 'Uno o más productos no existen'
            });

        }


        const nuevaOrden = new Ordenes({

            id: Date.now().toString(),

            productosOrden: productos.map(
                productoId => ({
                    productos: productoId
                })
            ),

            estado: estado || 'Pendiente',

            clienteAsociado: [
                {
                    cliente: usuario._id
                }
            ],

            fecha: new Date(),

            total: total

        });


        await nuevaOrden.save();

        //Enviar factura al correo de la empresa
        try {
        await sendFacturaEmail(nuevaOrden, usuario, productosEncontrados)
        } catch (emailError) {
        }

        res.status(201).json({
        msj: 'Orden creada correctamente',
        orden: nuevaOrden
        })

    } catch (error) {

        res.status(500).json({
            msj: 'Error al crear la orden: ' + error.message
        });

    }

});


// Consultar compras del usuario autenticado
router.get('/mis-compras', protect, async (req, res) => {

    try {

        const ordenes = await Ordenes.find({
            'clienteAsociado.cliente': req.usuario._id
        })
            .populate('productosOrden.productos')
            .populate('clienteAsociado.cliente');


        res.status(200).json(ordenes);


    } catch (error) {

        res.status(500).json({
            msj: 'Error al consultar las compras: ' + error.message
        });

    }

});

// Actualizar estado de una orden
router.put('/:id', protect, async (req, res) => {
    try {

        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({
                msj: 'El estado es requerido'
            });
        }

        const orden = await Ordenes.findById(req.params.id);

        if (!orden) {
            return res.status(404).json({
                msj: 'Orden no encontrada'
            });
        }

        orden.estado = estado;

        await orden.save();

        const ordenActualizada = await Ordenes.findById(orden._id)
            .populate('productosOrden.productos')
            .populate('clienteAsociado.cliente');

        res.status(200).json({
            msj: 'Estado de la orden actualizado correctamente',
            orden: ordenActualizada
        });

    } catch (error) {

        res.status(500).json({
            msj: 'Error al actualizar la orden: ' + error.message
        });

    }
});

module.exports = router;