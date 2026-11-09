const mongoose = require('mongoose');

const ordenesSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    productosOrden: [
        {
            productos: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Productos',
                required: true
            }
        }
    ],

    estado: {
        type: String,
        required: true,
        enum: ['Pendiente', 'Confirmada', 'En preparación', 'Enviada', 'Entregada', 'Cancelada']
    },

    clienteAsociado: [
        {
            cliente: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UsuarioEcora',
                required: true
            }
        }
    ],

    fecha: {
        type: Date,
        required: true,

    },

    total: {
        type: String,
        required: true
    },
}, { collection: 'ordenesEcora' });

module.exports = mongoose.model('OrdenesEcora', ordenesSchema);