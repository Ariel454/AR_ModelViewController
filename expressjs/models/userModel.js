class User {
  constructor(
    id,
    name,
    rol,
    codigo,
    cedula,
    email,
    password,
    direccion,
    puntos
  ) {
    this.id = id;
    this.name = name;
    this.rol = rol;
    this.codigo = codigo;
    this.cedula = cedula;
    this.email = email;
    this.password = password;
    this.direccion = direccion;
    this.puntos = puntos;
    this.reclamos = []; // Relación uno a muchos con Reclamo
    this.facturas = []; // Relación uno a muchos con Factura
  }

  addReclamo(reclamo) {
    this.reclamos.push(reclamo);
  }

  addFactura(factura) {
    this.facturas.push(factura);
  }
}

module.exports = User;
