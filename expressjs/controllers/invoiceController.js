const Invoice = require("../models/invoiceModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretKey = "tu_secreto";

let nextInvoiceId = 4; // Empieza en 4 ya que tienes 3 facturas predefinidas

const predefinedInvoices = [
  new Invoice(1, "F001", 1, new Date(), 150.0, "PENDIENTE"),
  new Invoice(2, "F002", 1, new Date(), 200.0, "APROBAD0"),
  new Invoice(3, "F003", 2, new Date(), 250.0, "DENEGAD0"),
];

let invoices = [...predefinedInvoices];

exports.getInvoices = (req, res) => {
  res.json(invoices);
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
  console.log("Solicitud para crear una nueva factura recibida");
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
  const { codigo, fecha, precio } = req.body;
  const invoiceIndex = invoices.findIndex(
    (invoice) => invoice.id === invoiceId
  );
  if (invoiceIndex !== -1) {
    invoices[invoiceIndex].codigo = codigo;
    invoices[invoiceIndex].fecha = new Date(fecha);
    invoices[invoiceIndex].precio = precio;
    invoices[invoiceIndex].estado = estado;
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
