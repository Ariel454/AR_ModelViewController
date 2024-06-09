const Claim = require("../models/claimModel");
const User = require("../models/userModel");
const Award = require("../models/awardModel");

let nextClaimId = 4; // Empieza en 1 y se incrementa con cada nuevo reclamo

const predefinedClaims = [
  new Claim(1, 1, 1),
  new Claim(2, 1, 2),
  new Claim(3, 2, 3),
];

let claims = [...predefinedClaims];

exports.getClaims = (req, res) => {
  res.json(claims);
};

exports.getClaimById = (req, res) => {
  const claimId = parseInt(req.params.id);
  const claim = claims.find((claim) => claim.id === claimId);
  if (claim) {
    res.json(claim);
  } else {
    res.status(404).json({ message: "Reclamo no encontrado" });
  }
};

exports.createClaim = (req, res) => {
  console.log("Solicitud para crear un nuevo reclamo recibida");
  const { user_id, award_id } = req.body;

  // Generar el nuevo ID automáticamente
  const newClaim = new Claim(nextClaimId++, user_id, award_id);

  claims.push(newClaim);
  res.status(201).json(newClaim);
};

exports.updateClaim = (req, res) => {
  const claimId = parseInt(req.params.id);
  const { user_id, award_id } = req.body;
  const claimIndex = claims.findIndex((claim) => claim.id === claimId);
  if (claimIndex !== -1) {
    claims[claimIndex].user_id = user_id;
    claims[claimIndex].award_id = award_id;
    res.json(claims[claimIndex]);
  } else {
    res.status(404).json({ message: "Reclamo no encontrado" });
  }
};

exports.deleteClaim = (req, res) => {
  const claimId = parseInt(req.params.id);
  const claimIndex = claims.findIndex((claim) => claim.id === claimId);
  if (claimIndex !== -1) {
    const deletedClaim = claims.splice(claimIndex, 1);
    res.json(deletedClaim[0]);
  } else {
    res.status(404).json({ message: "Reclamo no encontrado" });
  }
};
