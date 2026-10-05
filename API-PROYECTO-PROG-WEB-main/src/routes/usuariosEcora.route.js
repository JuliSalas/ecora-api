const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuariosEcora.model');
const protect = require('../middleware/auth.middleware');

const router = express.Router();

function crearToken(usuario) {
    return jwt.sign({
        id: usuario._id,
        rol: usuario.tipoUsuario
    },
        process.env.JWT_SECRET, { expiresIn: '2h' }
    )
}


router.get('/', async (req, res) => {

    try {

        const usuarios = await Usuario.find();

        if (usuarios.length === 0) {
            return res.status(404).json({
                msj: 'No hay usuarios registrados'
            });
        }

        res.json(usuarios);

    } catch (error) {

        res.status(500).json({
            msj: 'Error al obtener los usuarios: ' + error.message
        });

    }

});


router.get('/buscar/:correo', protect, async (req, res) => {

    try {

        const usuario = await Usuario.findOne({
            correo: req.params.correo
        });

        if (!usuario) {

            return res.status(404).json({
                msj: 'Usuario no encontrado'
            });

        }

        res.json(usuario);

    } catch (error) {

        res.status(500).json({
            msj: 'Error al buscar el usuario: ' + error.message
        });

    }

});



router.post('/', async (req, res) => {

    try {

        const {
            nombre,
            correo,
            contrasenna,
            tipoUsuario
        } = req.body;



        if (!nombre || !correo || !contrasenna || !tipoUsuario) {

            return res.status(400).json({
                msj: 'Nombre, correo y contraseña son requeridos'
            });

        }

        // Validar el tipo de usuario
        const tiposPermitidos = [
            'admin',
            'cliente'
        ];

        if (!tiposPermitidos.includes(tipoUsuario)) {

            return res.status(400).json({
                msj: 'El tipo de usuario debe ser admin o cliente'
            });

        }


        const usuarioExistente = await Usuario.findOne({
            correo: correo
        });

        if (usuarioExistente) {

            return res.status(409).json({
                msj: 'Ya existe un usuario registrado con ese correo'
            });

        }


        // Encriptar contraseña
        const contrasennaEncriptada = await bcrypt.hash(
            contrasenna,
            10
        );


        // Crear nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre: nombre,
            correo: correo,
            contrasenna: contrasennaEncriptada,
            tipoUsuario: tipoUsuario
        });



        await nuevoUsuario.save();


        res.status(201).json({

            msj: 'Usuario registrado correctamente',

            usuario: nuevoUsuario

        });


    } catch (error) {

        res.status(500).json({
            msj: 'Error al registrar el usuario: ' + error.message
        });

    }

});




router.post('/iniciar-sesion', async (req, res) => {

    try {

        const {
            correo,
            contrasenna
        } = req.body;


        // Buscar usuario
        const usuario = await Usuario.findOne({
            correo: correo
        });


        // Si el usuario no existe
        if (!usuario) {
            return res.status(401).json({
                msj: 'Credenciales inválidas.'
            });
        }

        // Comparar contraseña recibida
        // con la contraseña encriptada de MongoDB
        const contrasennaCorrecta = await bcrypt.compare(
            contrasenna,
            usuario.contrasenna
        );

        if (!contrasennaCorrecta) {
            return res.status(401).json({
                msg: 'Credenciales inválidas.'
            })
        }

        const token = crearToken(usuario)

        res.json({
            msg: 'Inicio de sesión correcto.',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.tipoUsuario
            }
        })


    } catch (error) {

        res.status(500).json({
            msj: 'Error al iniciar sesión: ' + error.message
        });

    }

});




router.put('/:id', protect, async (req, res) => {

    try {

        const {
            nombre,
            correo,
            contrasenna,
            tipoUsuario
        } = req.body;


        const datosActualizar = {};


        if (nombre) {
            datosActualizar.nombre = nombre;
        }


        if (correo) {
            datosActualizar.correo = correo;
        }

        if (tipoUsuario) {

            const tiposPermitidos = [
                'admin',
                'cliente'
            ];

            if (!tiposPermitidos.includes(tipoUsuario)) {

                return res.status(400).json({
                    msj: 'El tipo de usuario debe ser admin o cliente'
                });

            }

            datosActualizar.tipoUsuario = tipoUsuario;

        }
        // Si cambia la contraseña,
        // hay que volver a encriptarla
        if (contrasenna) {

            datosActualizar.contrasenna =
                await bcrypt.hash(contrasenna, 10);

        }


        const usuarioActualizado =
            await Usuario.findByIdAndUpdate(
                req.params.id,
                datosActualizar,
                {
                    new: true,
                    runValidators: true
                }
            );


        if (!usuarioActualizado) {

            return res.status(404).json({
                msj: 'Usuario no encontrado'
            });

        }


        res.json({

            msj: 'Usuario actualizado correctamente',

            usuario: usuarioActualizado

        });


    } catch (error) {

        res.status(500).json({
            msj: 'Error al modificar el usuario: ' + error.message
        });

    }

});


module.exports = router;