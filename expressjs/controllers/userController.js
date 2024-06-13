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
  const query = "SELECT * FROM User"; // Ajusta el nombre de la tabla según tu base de datos
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching users");
      return;
    }
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const query = "SELECT * FROM User WHERE id = ?"; // Ajusta el nombre de la tabla y la columna según tu base de datos
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching user");
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.json(results[0]);
    }
  });
};

let nextUserId = 11; // Comienza en 11 ya que tenemos 10 usuarios predefinidos

exports.createUser = (req, res) => {
  const { name, rol, codigo, cedula, email, password, direccion, puntos } =
    req.body;
  const query =
    "INSERT INTO User (name, rol, codigo, cedula, email, password, direccion, puntos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"; // Ajusta el nombre de la tabla según tu base de datos
  db.query(
    query,
    [name, rol, codigo, cedula, email, password, direccion, puntos],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error creating user");
        return;
      }
      res.status(201).json({
        id: results.insertId,
        name,
        rol,
        codigo,
        cedula,
        email,
        direccion,
        puntos,
      });
    }
  );
};

exports.updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, rol, codigo, cedula, email, password, direccion, puntos } =
    req.body;
  const query =
    "UPDATE User SET name = ?, rol = ?, codigo = ?, cedula = ?, email = ?, password = ?, direccion = ?, puntos = ? WHERE id = ?"; // Ajusta el nombre de la tabla según tu base de datos
  db.query(
    query,
    [name, rol, codigo, cedula, email, password, direccion, puntos, userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating user");
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: "Usuario no encontrado" });
      } else {
        res.json({
          id: userId,
          name,
          rol,
          codigo,
          cedula,
          email,
          direccion,
          puntos,
        });
      }
    }
  );
};

exports.deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const query = "DELETE FROM User WHERE id = ?"; // Ajusta el nombre de la tabla y la columna según tu base de datos
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting user");
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.json({ id: userId });
    }
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  // Buscar al usuario por su correo electrónico en la base de datos
  const query = "SELECT * FROM User WHERE email = ?"; // Ajusta el nombre de la tabla y la columna según tu base de datos
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error al buscar usuario" });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ message: "Usuario no encontrado" });
      return;
    }
    const user = results[0];
    // Verificar la contraseña
    if (password !== user.password) {
      res.status(401).json({ message: "Contraseña incorrecta" });
      return;
    }
    // Si las credenciales son válidas, generar un token de sesión
    const token = jwt.sign({ user: user }, secretKey, {
      expiresIn: "1h",
    });
    // Incluir el usuario y el token en la respuesta
    res.json({ token, user });
  });
};
