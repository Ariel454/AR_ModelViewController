// userController.js

const User = require('../models/userModel');

// Simulando una base de datos de usuarios
let users = [];

// Controlador para obtener todos los usuarios
exports.getUsers = (req, res) => {
    res.json(users);
};

// Controlador para obtener un usuario por su ID
exports.getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// Controlador para crear un nuevo usuario
exports.createUser = (req, res) => {
    console.log('Solicitud para crear un nuevo usuario recibida');
    const { name, email } = req.body;
    const newUser = new User(Date.now(), name, email);
    users.push(newUser);
    res.status(201).json(newUser);
};

// Controlador para actualizar un usuario
exports.updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex].name = name;
        users[userIndex].email = email;
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// Controlador para eliminar un usuario
exports.deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        res.json(deletedUser[0]);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};
