// index.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas para usuarios
router.get('/users', userController.getUsers); // Obtener todos los usuarios
router.get('/users/:id', userController.getUserById); // Obtener un usuario por su ID
router.post('/users', userController.createUser); // Crear un nuevo usuario
router.put('/users/:id', userController.updateUser); // Actualizar un usuario por su ID
router.delete('/users/:id', userController.deleteUser); // Eliminar un usuario por su ID

module.exports = router;
