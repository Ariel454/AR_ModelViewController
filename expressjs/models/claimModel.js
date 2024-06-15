class Claim {
  constructor(id, user_id, award_id, fecha) {
    this.id = id;
    this.user_id = user_id;
    this.award_id = award_id;
    this.fecha = fecha;
  }
}

module.exports = Claim;
