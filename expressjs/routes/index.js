const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.get('/users', userController.getUsers); // Obtener todos los usuarios
router.get('/users/:id', userController.getUserById); // Obtener un usuario por su ID
router.post('/users', userController.createUser); // Crear un nuevo usuario
router.put('/users/:id', userController.updateUser); // Actualizar un usuario por su ID
router.delete('/users/:id', userController.deleteUser); // Eliminar un usuario por su ID
router.post('/login', userController.login);

module.exports = router;


