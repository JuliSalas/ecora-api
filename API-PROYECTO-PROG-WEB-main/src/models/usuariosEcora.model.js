const mongoose = require('mongoose');

const usuarioEcoraSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    correo: {
        type: String,
        required: true
    },

    contrasenna: {
        type: String,
        required: true
    },

    tipoUsuario: {
        type: String,
        required: true,
        enum: ['admin', 'cliente']
    }
}, { collection: 'usuariosEcora' });

module.exports = mongoose.model('UsuarioEcora', usuarioEcoraSchema);