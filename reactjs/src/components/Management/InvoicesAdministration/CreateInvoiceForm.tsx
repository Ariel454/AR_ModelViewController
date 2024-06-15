import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";

import ListInvoices from "./ListInvoices";
import { Invoice } from "../../../types/invoice";

interface CreateInvoiceFormProps {
  onCreate: (invoiceData: Invoice) => void;
}

const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = ({ onCreate }) => {
  const [recibo, setRecibo] = useState<string>("");
  const [codigo, setCodigo] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [fecha, setFecha] = useState<string>("");
  const [precio, setPrecio] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://ar-mvc-api.vercel.app/api/invoices",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recibo,
            codigo,
            user_id: parseInt(userId, 10),
            fecha,
            precio: parseFloat(precio),
            estado: "PENDIENTE",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear factura");
      }

      const newInvoice = await response.json();
      onCreate(newInvoice);
      setCodigo("");
      setUserId("");
      setFecha("");
      setPrecio("");
      setMessage("Factura creada exitosamente");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error al crear factura");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Código"
              variant="outlined"
              fullWidth
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ID de Usuario"
              variant="outlined"
              fullWidth
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha"
              variant="outlined"
              fullWidth
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Precio"
              variant="outlined"
              fullWidth
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Crear Factura
            </Button>
          </Grid>
          {message && (
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color={message.startsWith("Error") ? "error" : "success"}
              >
                {message}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
      <ListInvoices />
    </div>
  );
};

export default CreateInvoiceForm;
