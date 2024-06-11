const Invoice = require("../models/invoiceModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretKey = "tu_secreto";

let nextInvoiceId = 51; // Empieza en 4 ya que tienes 3 facturas predefinidas

const predefinedInvoices = [
  new Invoice(1, "F001", 1, new Date(), 150.0, "PENDIENTE"),
  new Invoice(2, "F002", 1, new Date(), 200.0, "APROBADO"),
  new Invoice(3, "F003", 2, new Date(), 250.0, "DENEGADO"),
  new Invoice(4, "F004", 4, new Date("2024-04-05"), 320.0, "APROBADO"),
  new Invoice(5, "F005", 5, new Date("2024-04-06"), 400.0, "PENDIENTE"),
  new Invoice(6, "F006", 6, new Date("2024-04-07"), 270.0, "DENEGADO"),
  new Invoice(7, "F007", 7, new Date("2024-04-08"), 350.0, "APROBADO"),
  new Invoice(8, "F008", 8, new Date("2024-04-09"), 150.0, "APROBADO"),
  new Invoice(9, "F009", 9, new Date("2024-04-10"), 175.0, "PENDIENTE"),
  new Invoice(10, "F010", 10, new Date("2024-04-11"), 220.0, "DENEGADO"),
  new Invoice(11, "F011", 4, new Date("2024-04-12"), 450.0, "APROBADO"),
  new Invoice(12, "F012", 5, new Date("2024-04-13"), 280.0, "APROBADO"),
  new Invoice(13, "F013", 6, new Date("2024-04-14"), 330.0, "PENDIENTE"),
  new Invoice(14, "F014", 7, new Date("2024-04-15"), 120.0, "DENEGADO"),
  new Invoice(15, "F015", 8, new Date("2024-04-16"), 210.0, "APROBADO"),
  new Invoice(16, "F016", 9, new Date("2024-04-17"), 290.0, "PENDIENTE"),
  new Invoice(17, "F017", 10, new Date("2024-04-18"), 140.0, "APROBADO"),
  new Invoice(18, "F018", 4, new Date("2024-04-19"), 315.0, "APROBADO"),
  new Invoice(19, "F019", 5, new Date("2024-04-20"), 230.0, "PENDIENTE"),
  new Invoice(20, "F020", 6, new Date("2024-04-21"), 270.0, "APROBADO"),
  new Invoice(21, "F021", 7, new Date("2024-04-22"), 190.0, "DENEGADO"),
  new Invoice(22, "F022", 8, new Date("2024-04-23"), 300.0, "APROBADO"),
  new Invoice(23, "F023", 9, new Date("2024-04-24"), 250.0, "PENDIENTE"),
  new Invoice(24, "F024", 10, new Date("2024-04-25"), 275.0, "APROBADO"),
  new Invoice(25, "F025", 4, new Date("2024-04-26"), 160.0, "APROBADO"),
  new Invoice(26, "F026", 5, new Date("2024-04-27"), 390.0, "DENEGADO"),
  new Invoice(27, "F027", 6, new Date("2024-04-28"), 250.0, "APROBADO"),
  new Invoice(28, "F028", 7, new Date("2024-04-29"), 260.0, "PENDIENTE"),
  new Invoice(29, "F029", 8, new Date("2024-04-30"), 370.0, "APROBADO"),
  new Invoice(30, "F030", 9, new Date("2024-05-01"), 340.0, "PENDIENTE"),
  new Invoice(31, "F031", 10, new Date("2024-05-02"), 410.0, "APROBADO"),
  new Invoice(32, "F032", 4, new Date("2024-05-03"), 215.0, "DENEGADO"),
  new Invoice(33, "F033", 5, new Date("2024-05-04"), 285.0, "APROBADO"),
  new Invoice(34, "F034", 6, new Date("2024-05-05"), 220.0, "APROBADO"),
  new Invoice(35, "F035", 7, new Date("2024-05-06"), 390.0, "PENDIENTE"),
  new Invoice(36, "F036", 8, new Date("2024-05-07"), 180.0, "APROBADO"),
  new Invoice(37, "F037", 9, new Date("2024-05-08"), 170.0, "APROBADO"),
  new Invoice(38, "F038", 10, new Date("2024-05-09"), 270.0, "DENEGADO"),
  new Invoice(39, "F039", 4, new Date("2024-05-10"), 310.0, "APROBADO"),
  new Invoice(40, "F040", 5, new Date("2024-05-11"), 255.0, "PENDIENTE"),
  new Invoice(41, "F041", 6, new Date("2024-05-12"), 295.0, "APROBADO"),
  new Invoice(42, "F042", 7, new Date("2024-05-13"), 200.0, "APROBADO"),
  new Invoice(43, "F043", 8, new Date("2024-05-14"), 145.0, "PENDIENTE"),
  new Invoice(44, "F044", 9, new Date("2024-05-15"), 360.0, "APROBADO"),
  new Invoice(45, "F045", 10, new Date("2024-05-16"), 385.0, "APROBADO"),
  new Invoice(46, "F046", 4, new Date("2024-05-17"), 275.0, "PENDIENTE"),
  new Invoice(47, "F047", 5, new Date("2024-05-18"), 420.0, "DENEGADO"),
  new Invoice(48, "F048", 6, new Date("2024-05-19"), 260.0, "APROBADO"),
  new Invoice(49, "F049", 7, new Date("2024-05-20"), 230.0, "PENDIENTE"),
  new Invoice(50, "F050", 8, new Date("2024-05-21"), 325.0, "APROBADO"),
];

let invoices = [...predefinedInvoices];

// En tu archivo de rutas o controladores

exports.getInvoices = (req, res) => {
  const { estado } = req.query;
  let filteredInvoices = [...invoices]; // Copia de las facturas originales

  if (estado) {
    filteredInvoices = invoices.filter(
      (invoice) => invoice.estado.toUpperCase() === estado.toUpperCase()
    );
  }

  res.json(filteredInvoices);
};

exports.getApprovedInvoicesByUserId = (req, res) => {
  const userId = parseInt(req.params.userId);
  const approvedInvoices = invoices.filter(
    (invoice) => invoice.user_id === userId && invoice.estado === "APROBADO"
  );

  res.json(approvedInvoices);
};

exports.getInvoiceById = (req, res) => {
  const invoiceId = parseInt(req.params.id);
  const invoice = invoices.find((invoice) => invoice.id === invoiceId);
  if (invoice) {
    res.json(invoice);
  } else {
    res.status(404).json({ message: "Factura no encontrada" });
  }
};

exports.createInvoice = (req, res) => {
  const { codigo, user_id, fecha, precio, estado } = req.body;

  // Generar el nuevo ID automáticamente
  const newInvoice = new Invoice(
    nextInvoiceId++,
    codigo,
    user_id,
    new Date(fecha),
    precio,
    estado
  );

  invoices.push(newInvoice);
  res.status(201).json(newInvoice);
};

exports.updateInvoice = (req, res) => {
  const invoiceId = parseInt(req.params.id);
  const { codigo, fecha, precio, estado } = req.body;
  const invoiceIndex = invoices.findIndex(
    (invoice) => invoice.id === invoiceId
  );
  if (invoiceIndex !== -1) {
    if (estado !== undefined) {
      // Solo actualizamos el estado
      invoices[invoiceIndex].estado = estado;
    } else {
      // Actualizamos todos los campos de la factura
      invoices[invoiceIndex].codigo = codigo;
      invoices[invoiceIndex].fecha = new Date(fecha);
      invoices[invoiceIndex].precio = precio;
    }
    res.json(invoices[invoiceIndex]);
  } else {
    res.status(404).json({ message: "Factura no encontrada" });
  }
};

exports.deleteInvoice = (req, res) => {
  const invoiceId = parseInt(req.params.id);
  const invoiceIndex = invoices.findIndex(
    (invoice) => invoice.id === invoiceId
  );
  if (invoiceIndex !== -1) {
    const deletedInvoice = invoices.splice(invoiceIndex, 1);
    res.json(deletedInvoice[0]);
  } else {
    res.status(404).json({ message: "Factura no encontrada" });
  }
};
