const Award = require("../models/awardModel");

let nextAwardId = 21; // Empezamos en 4 ya que tienes 3 premios predefinidos

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
  new Award(
    6,
    "AW006",
    "Smartwatch Deportivo",
    "Smartwatch con monitor de frecuencia cardíaca, GPS, resistente al agua, múltiples modos de deporte, larga duración de la batería",
    80.0,
    100
  ),
  new Award(
    7,
    "AW007",
    "Laptop Ultrabook",
    "Ultrabook ligera y delgada, procesador de alta velocidad, pantalla Full HD, gran capacidad de almacenamiento, batería de larga duración",
    200.0,
    250
  ),
  new Award(
    8,
    "AW008",
    "Consola de Videojuegos",
    "Consola de videojuegos de última generación, gráficos impresionantes, amplio catálogo de juegos, mandos inalámbricos ergonómicos",
    300.0,
    375
  ),
  new Award(
    9,
    "AW009",
    "Bicicleta Eléctrica",
    "Bicicleta eléctrica con motor de alta potencia, batería de larga duración, diseño ergonómico, ideal para desplazamientos urbanos",
    400.0,
    500
  ),
  new Award(
    10,
    "AW010",
    "Cámara de Acción 4K",
    "Cámara de acción resistente al agua, grabación en 4K, múltiples accesorios de montaje, ideal para deportes extremos y aventuras",
    90.0,
    112.5
  ),
  new Award(
    11,
    "AW011",
    "Proyector Portátil",
    "Proyector portátil con resolución HD, conectividad inalámbrica, batería recargable, ideal para presentaciones y entretenimiento",
    110.0,
    137.5
  ),
  new Award(
    12,
    "AW012",
    "Sistema de Sonido Envolvente",
    "Sistema de sonido envolvente 5.1, calidad de sonido excepcional, conectividad Bluetooth, ideal para cine en casa",
    250.0,
    312.5
  ),
  new Award(
    13,
    "AW013",
    "Cafetera Espresso Automática",
    "Cafetera espresso automática con molinillo integrado, varios niveles de molienda, fácil de usar y limpiar",
    130.0,
    162.5
  ),
  new Award(
    14,
    "AW014",
    "Horno de Convección",
    "Horno de convección con múltiples funciones de cocción, temporizador programable, distribución uniforme del calor",
    90.0,
    112.5
  ),
  new Award(
    15,
    "AW015",
    "Teléfono Inteligente de Gama Alta",
    "Teléfono inteligente con pantalla AMOLED, cámara de alta resolución, gran capacidad de almacenamiento, batería de larga duración",
    300.0,
    375
  ),
  new Award(
    16,
    "AW016",
    "Bicicleta Estática",
    "Bicicleta estática con pantalla LCD, múltiples niveles de resistencia, diseño ergonómico, ideal para entrenamiento en casa",
    150.0,
    187.5
  ),
  new Award(
    17,
    "AW017",
    "Purificador de Aire",
    "Purificador de aire con filtro HEPA, ideal para eliminar alérgenos y contaminantes, operación silenciosa, ideal para el hogar y la oficina",
    110.0,
    137.5
  ),
  new Award(
    18,
    "AW018",
    "Cámara de Seguridad Inteligente",
    "Cámara de seguridad inteligente con grabación en 1080p, visión nocturna, detección de movimiento, almacenamiento en la nube",
    100.0,
    125
  ),
  new Award(
    19,
    "AW019",
    "Plancha de Vapor Profesional",
    "Plancha de vapor profesional con múltiples ajustes de temperatura, suela antiadherente, depósito de agua de gran capacidad",
    70.0,
    87.5
  ),
  new Award(
    20,
    "AW020",
    "Altavoz Inteligente",
    "Altavoz inteligente con asistente de voz integrado, sonido de alta calidad, conectividad Bluetooth, control por voz",
    60.0,
    75
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
