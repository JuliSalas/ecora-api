const mongoose = require('mongoose');

const productosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    categorias: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categorias',
            required: true
        }
    ],

    tallas: {
        type: Array,
        required: true
    },

    descripcion: {
        type: String,
        required: true,
    },

    precio: {
        type: String,
        required: true
    },

    imagen: {
        type: String,
        required: true
    },
}, { collection: 'productosEcora' });

module.exports = mongoose.model('Productos', productosSchema);