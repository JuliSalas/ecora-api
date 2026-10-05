const mongoose = require('mongoose');

const categoriasSchema = new mongoose.Schema({
    genero: {
        type: String,
        required: true,
        enum: ['Hombre', 'Mujer']
    },

    tipo: {
        type: String,
        required: true
    }
}, { collection: 'categoriasEcora' });

module.exports = mongoose.model('Categorias', categoriasSchema);