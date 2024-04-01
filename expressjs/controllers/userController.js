const User = require('../models/userModel');

let users = [];

exports.getUsers = (req, res) => {
    res.json(users);
};

exports.getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

exports.createUser = (req, res) => {
    console.log('Solicitud para crear un nuevo usuario recibida');
    const { name, email } = req.body;
    const newUser = new User(Date.now(), name, email);
    users.push(newUser);
    res.status(201).json(newUser);
};

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
