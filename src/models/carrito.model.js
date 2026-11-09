const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    productos: {
        type: String,
        required: true,
        enum: ['Pendiente', 'Confirmada', 'En preparación', 'Enviada', 'Entregada', 'Cancelada']
    },

    total: {
        type: String,
        required: true
    },
}, { collection: 'carritoEcora' });

module.exports = mongoose.model('CarritoEcora', carritoSchema);