const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Categorias = require('../models/categorias.model');
const protect = require('../middleware/auth.middleware');
const categoriasModel = require('../models/categorias.model');
const router = express.Router();

router.get('/', async (req, res) => {

    try {

        const categoria = await Categorias.find();

        if (categoria.length === 0) {
            return res.status(404).json({
                msj: 'No hay categorias registradas'
            });
        }

        res.json(categoria);

    } catch (error) {

        res.status(500).json({
            msj: 'Error al obtener las categorias: ' + error.message
        });

    }

});

router.get('/:id', async (req, res) => {
    try {
        const categoria = await Categorias.findById(req.params.id);

        if (!categoria) {
            return res.status(404).json({
                msj: 'Categoria no encontrada'
            });
        }

        await Categorias.findById(req.params.id);

        res.json(categoria);

    } catch (error) {
        res.status(400).json({
            msj: 'Error al encontrar la categoria: ' + error.message
        });
    }
});


router.post('/', async (req, res) => {

    try {

        const {
            genero,
            tipo
        } = req.body;



        if (!genero || !tipo) {

            return res.status(400).json({
                msj: 'Género y tipo son requeridos'
            });

        }

        const generosPermitidos = [
            'Hombre',
            'Mujer'
        ];

        if (!generosPermitidos.includes(genero)) {

            return res.status(400).json({
                msj: 'El genero de la categoria debe ser hombre o mujer'
            });

        }


        const tipoExistente = await Categorias.findOne({
            tipo: tipo
        });

        if (tipoExistente) {

            return res.status(400).json({
                msj: 'Ya existe una categoria registrado con ese tipo'
            });

        }

        const nuevaCategoria = new Categorias({
            genero: genero,
            tipo: tipo
        });



        await nuevaCategoria.save();


        res.status(201).json({

            msj: 'Categoria registrada correctamente',

            categoria: nuevaCategoria

        });


    } catch (error) {

        res.status(500).json({
            msj: 'Error al registrar la categoria: ' + error.message
        });

    }

});

module.exports = router;