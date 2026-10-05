const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuariosEcora.model')

async function protect(req, res, next) {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                msg: 'El token es requerido.'
            })
        }

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const usuario = await Usuario.findById(decoded.id).select('-contrasenna')

        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no válido.'
            })
        }

        req.usuario = usuario
        next()
    }

    catch (error) {
        res.status(401).json({
            msg: 'Token inválido o vencido.' + error
        })
    }
}

module.exports = protect