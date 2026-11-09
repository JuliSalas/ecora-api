const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();


require('dotenv').config();//process.env
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json()); //Se habilita la lectura de JSON

app.use(cors());

//Ruta principal
app.get('/', (req, res) => {
    res.status(200).json({
        msj: 'Bienvenido a la API de Ecora',
        estado: 'Ok, funcionando.'
    });
});

//Rutas específicas
app.post('/api/test', (req, res) => {
    res.json({
        msj: 'Datos recibidos correctamente',
        body: req.body
    });
});

const usuariosRoutes = require('./routes/usuariosEcora.route');

app.use('/api/usuarios', usuariosRoutes);

const categoriasRoutes = require('./routes/categorias.route');

app.use('/api/categorias', categoriasRoutes);

const productosRoutes = require('./routes/productos.route');

app.use('/api/productos', productosRoutes);

const ordenesRoutes = require('./routes/ordenes.route');

app.use('/api/ordenes', ordenesRoutes);

const emailRoute = require('./routes/email.route')

app.use('/api/email', emailRoute);

connectDB()
    .then(() => {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('No se pudo iniciar el servidor:', error.message);
        process.exit(1);
    });