const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// TODO: Crear el servidor
const app = express();

// TODO: Base de datos
dbConnection();

// TODO: CORS
app.use(cors());

// TODO :Directorio publico
app.use(express.static('public'));

// TODO: Lectura y parceo del body
app.use(express.json());

// TODO: Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/producto', require('./routes/producto'));

// TODO: Escuchar peticiones
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Servidor correiendo en puerto ${PORT}`)
});