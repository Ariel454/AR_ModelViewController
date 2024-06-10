class Invoice {
  constructor(id, codigo, user_id, fecha, precio, estado) {
    this.id = id;
    this.codigo = codigo;
    this.user_id = user_id;
    this.fecha = fecha;
    this.precio = precio;
    this.estado = estado;
  }
}

module.exports = Invoice;
