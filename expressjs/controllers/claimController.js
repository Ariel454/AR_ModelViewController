const Claim = require("../models/claimModel");
const User = require("../models/userModel");
const Award = require("../models/awardModel");

let nextClaimId = 31; // Ajusta este valor según tus necesidades

const predefinedClaims = [
  new Claim(1, 3, 19, "2023-07-11"),
  new Claim(2, 1, 16, "2023-12-04"),
  new Claim(3, 3, 4, "2023-07-28"),
  new Claim(4, 4, 2, "2023-11-09"),
  new Claim(5, 2, 11, "2023-08-23"),
  new Claim(6, 1, 13, "2023-12-10"),
  new Claim(7, 4, 7, "2023-08-05"),
  new Claim(8, 5, 3, "2023-10-18"),
  new Claim(9, 3, 14, "2023-06-14"),
  new Claim(10, 2, 1, "2023-09-27"),
  new Claim(11, 5, 20, "2023-06-25"),
  new Claim(12, 1, 5, "2023-11-11"),
  new Claim(13, 4, 17, "2023-09-07"),
  new Claim(14, 2, 9, "2023-10-14"),
  new Claim(15, 3, 12, "2023-12-06"),
  new Claim(16, 1, 8, "2023-07-02"),
  new Claim(17, 2, 10, "2023-06-03"),
  new Claim(18, 5, 15, "2023-09-21"),
  new Claim(19, 4, 6, "2023-11-28"),
  new Claim(20, 3, 18, "2023-08-16"),
  new Claim(21, 1, 14, "2023-06-08"),
  new Claim(22, 5, 13, "2023-10-01"),
  new Claim(23, 4, 4, "2023-12-03"),
  new Claim(24, 2, 19, "2023-09-17"),
  new Claim(25, 3, 7, "2023-08-11"),
  new Claim(26, 1, 5, "2023-07-19"),
  new Claim(27, 2, 16, "2023-06-12"),
  new Claim(28, 5, 8, "2023-11-07"),
  new Claim(29, 4, 20, "2023-10-23"),
  new Claim(30, 1, 1, "2023-09-14"),
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

exports.getTopUsersByClaims = (req, res) => {
  const { startDate, endDate } = req.query;

  const filteredClaims = claims.filter((claim) => {
    return (
      new Date(claim.fecha) >= new Date(startDate) &&
      new Date(claim.fecha) <= new Date(endDate)
    );
  });

  const userClaimCounts = filteredClaims.reduce((acc, claim) => {
    if (!acc[claim.user_id]) {
      acc[claim.user_id] = 0;
    }
    acc[claim.user_id]++;
    return acc;
  }, {});

  const sortedUsers = Object.entries(userClaimCounts)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => ({ user_id: entry[0], count: entry[1] }));

  res.json(sortedUsers);
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
