const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const apiRouter = require("./routes/index");

// Middleware
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

// Rutas API
app.use("/api", apiRouter);

app.get("/users", (req, res) => {
  const htmlResponse = `<html>
    <head>
    <title>API EXPRESS</title>
    </head>
    <body>
    <h1>Proyecto backend</h1>
    </body>
    </html>`;
  res.send(htmlResponse);
});

// Ruta para obtener datos de la base de datos
app.get("/api/users2", (req, res) => {
  const query = "SELECT * FROM User"; // Ajusta esta consulta según tu tabla y datos
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching users");
      return;
    }
    res.json(results);
  });
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
