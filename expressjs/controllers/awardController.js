const Award = require("../models/awardModel");

let nextAwardId = 4; // Empezamos en 4 ya que tienes 3 premios predefinidos

const predefinedAwards = [
  new Award(1, "AW001", "Premio 1", 50.0, 100),
  new Award(2, "AW002", "Premio 2", 75.0, 150),
  new Award(3, "AW003", "Premio 3", 100.0, 200),
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
  console.log("Solicitud para crear un nuevo premio recibida");
  const { codigo, etiqueta, precio, puntos } = req.body;

  // Generar el nuevo ID automáticamente
  const newAward = new Award(
    nextAwardId++,
    codigo,
    etiqueta,
    parseFloat(precio),
    parseInt(puntos, 10)
  );

  awards.push(newAward);
  res.status(201).json(newAward);
};

exports.updateAward = (req, res) => {
  const awardId = parseInt(req.params.id);
  const { codigo, etiqueta, precio, puntos } = req.body;
  const awardIndex = awards.findIndex((award) => award.id === awardId);
  if (awardIndex !== -1) {
    awards[awardIndex].codigo = codigo;
    awards[awardIndex].etiqueta = etiqueta;
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
