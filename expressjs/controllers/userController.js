const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretKey = "tu_secreto";

const predefinedUsers = [
  new User(
    1,
    "Ariel Raura",
    "ADM",
    "A0001",
    "1726605007",
    "ariel@gmail.com",
    "ariel123",
    "Quito",
    100
  ),
  new User(
    2,
    "Juan Lopez",
    "COM",
    "A0002",
    "1726645007",
    "juan@gmail.com",
    "juan123",
    "Guayaquil",
    50
  ),
  new User(
    3,
    "David Diaz",
    "CLI",
    "A0003",
    "1987924680",
    "david@gmail.com",
    "david123",
    "Loja",
    75
  ),
  new User(
    4,
    "Maria Gonzalez",
    "CLI",
    "A0004",
    "1800987654",
    "maria@gmail.com",
    "maria123",
    "Cuenca",
    60
  ),
  new User(
    5,
    "Carlos Perez",
    "ADM",
    "A0005",
    "1745678901",
    "carlos@gmail.com",
    "carlos123",
    "Ambato",
    90
  ),
  new User(
    6,
    "Ana Morales",
    "CLI",
    "A0006",
    "1987456123",
    "ana@gmail.com",
    "ana123",
    "Manta",
    70
  ),
  new User(
    7,
    "Luis Torres",
    "COM",
    "A0007",
    "1800234567",
    "luis@gmail.com",
    "luis123",
    "Riobamba",
    40
  ),
  new User(
    8,
    "Sofia Ramirez",
    "CLI",
    "A0008",
    "1923456789",
    "sofia@gmail.com",
    "sofia123",
    "Esmeraldas",
    55
  ),
  new User(
    9,
    "Miguel Castillo",
    "ADM",
    "A0009",
    "1908765432",
    "miguel@gmail.com",
    "miguel123",
    "Santo Domingo",
    85
  ),
  new User(
    10,
    "Elena Vargas",
    "CLI",
    "A0010",
    "1986543210",
    "elena@gmail.com",
    "elena123",
    "Ibarra",
    65
  ),
];

// Agregar los usuarios predefinidos a la lista de usuarios
let users = [...predefinedUsers];

exports.getUsers = (req, res) => {
  res.json(users);
};

exports.getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    res.status(404).json({ message: "Usuario no encontrado" });
  } else {
    res.json(user);
  }
};

let nextUserId = 11; // Comienza en 11 ya que tenemos 10 usuarios predefinidos

exports.createUser = (req, res) => {
  const { name, rol, codigo, cedula, email, password, direccion, puntos } =
    req.body;
  const newUser = new User(
    nextUserId++,
    name,
    rol,
    codigo,
    cedula,
    email,
    password,
    direccion,
    puntos
  );
  users.push(newUser);
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, rol, codigo, cedula, email, password, direccion, puntos } =
    req.body;
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    res.status(404).json({ message: "Usuario no encontrado" });
  } else {
    const updatedUser = new User(
      userId,
      name,
      rol,
      codigo,
      cedula,
      email,
      password,
      direccion,
      puntos
    );
    users[userIndex] = updatedUser;
    res.json(updatedUser);
  }
};

exports.deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    res.status(404).json({ message: "Usuario no encontrado" });
  } else {
    users.splice(userIndex, 1);
    res.json({ id: userId });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.email === username);
  if (!user) {
    res.status(401).json({ message: "Usuario no encontrado" });
  } else if (password !== user.password) {
    res.status(401).json({ message: "Contraseña incorrecta" });
  } else {
    const token = jwt.sign({ user: user }, secretKey, { expiresIn: "1h" });
    res.json({ token, user });
  }
};
