const Invoice = require("../models/invoiceModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretKey = "tu_secreto";

const predefinedInvoices = [
  new Invoice(1, "R001", "F001", 1, new Date(), 150.0),
  new Invoice(2, "R002", "F002", 1, new Date(), 200.0),
  new Invoice(3, "R003", "F003", 2, new Date(), 250.0),
];

// Agregar las facturas predefinidas a la lista de facturas
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
  const { recibo, codigo, user_id, fecha, precio } = req.body;
  const newInvoice = new Invoice(
    Date.now(),
    recibo,
    codigo,
    user_id,
    new Date(fecha),
    precio
  );
  invoices.push(newInvoice);
  res.status(201).json(newInvoice);
};

exports.updateInvoice = (req, res) => {
  const invoiceId = parseInt(req.params.id);
  const { recibo, codigo, fecha, precio } = req.body;
  const invoiceIndex = invoices.findIndex(
    (invoice) => invoice.id === invoiceId
  );
  if (invoiceIndex !== -1) {
    invoices[invoiceIndex].recibo = recibo;
    invoices[invoiceIndex].codigo = codigo;
    invoices[invoiceIndex].fecha = new Date(fecha);
    invoices[invoiceIndex].precio = precio;
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
