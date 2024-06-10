const Award = require("../models/awardModel");

let nextAwardId = 6; // Empezamos en 4 ya que tienes 3 premios predefinidos

const predefinedAwards = [
  new Award(
    1,
    "AW001",
    "Televisión 4K 55 pulgadas",
    "Televisión con resolución 4K, pantalla de 55 pulgadas, tecnología LED, calidad de imagen excepcional",
    50.0,
    100
  ),
  new Award(
    2,
    "AW002",
    "Tableta Gráfica Profesional",
    "Tableta gráfica profesional para diseño digital, sensibilidad a la presión ajustable, área de trabajo grande, compatible con diversos programas de diseño",
    75.0,
    150
  ),
  new Award(
    3,
    "AW003",
    "Auriculares Inalámbricos de Alta Calidad",
    "Auriculares inalámbricos con cancelación de ruido, sonido de alta fidelidad, diseño ergonómico, larga duración de la batería",
    100.0,
    200
  ),
  new Award(
    4,
    "AW004",
    "Robot Aspirador Inteligente",
    "Robot aspirador inteligente con mapeo de habitaciones, succión potente, navegación autónoma, control desde el teléfono móvil",
    120.0,
    240
  ),
  new Award(
    5,
    "AW005",
    "Cámara Réflex Digital Profesional",
    "Cámara réflex digital profesional con sensor de alta resolución, grabación de video en 4K, gran variedad de lentes compatibles, ideal para fotografía creativa",
    150.0,
    300
  ),
];

let awards = [...predefinedAwards];

exports.getAwards = (req, res) => {
  res.json(awards);
};

exports.getAwardById = (req, res) => {
  const awardId = parseInt(req.params.id);
  const award = awards.find((award) => award.id === awardId);
  if (award) {
    res.json(award);
  } else {
    res.status(404).json({ message: "Premio no encontrado" });
  }
};

exports.createAward = (req, res) => {
  const { codigo, etiqueta, descripcion, precio, puntos } = req.body;

  // Generar el nuevo ID automáticamente
  const newAward = new Award(
    nextAwardId++,
    codigo,
    etiqueta,
    descripcion,
    parseFloat(precio),
    parseInt(puntos, 10)
  );

  awards.push(newAward);
  res.status(201).json(newAward);
};

exports.updateAward = (req, res) => {
  const awardId = parseInt(req.params.id);
  const { codigo, etiqueta, descripcion, precio, puntos } = req.body;
  const awardIndex = awards.findIndex((award) => award.id === awardId);
  if (awardIndex !== -1) {
    awards[awardIndex].codigo = codigo;
    awards[awardIndex].etiqueta = etiqueta;
    awards[awardIndex].descripcion = descripcion;
    awards[awardIndex].precio = parseFloat(precio);
    awards[awardIndex].puntos = parseInt(puntos, 10);
    res.json(awards[awardIndex]);
  } else {
    res.status(404).json({ message: "Premio no encontrado" });
  }
};

exports.deleteAward = (req, res) => {
  const awardId = parseInt(req.params.id);
  const awardIndex = awards.findIndex((award) => award.id === awardId);
  if (awardIndex !== -1) {
    const deletedAward = awards.splice(awardIndex, 1);
    res.json(deletedAward[0]);
  } else {
    res.status(404).json({ message: "Premio no encontrado" });
  }
};
