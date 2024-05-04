
const express = require('express');
const cors = require('cors');
const LocalStrategy = require('passport').Strategy;
const userController = require('./controllers/userController');

const app = express();
const apiRouter = require('./routes/index');
const path = require('path');

// Middleware
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Rutas API
app.use('/api', apiRouter);


// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
