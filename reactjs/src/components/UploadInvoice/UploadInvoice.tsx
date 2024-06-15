import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";

import { Invoice } from "../../types/invoice";
import { User } from "../../types/user";

interface InvoiceFormProps {
  user: User | null;
  onCreate: (invoiceData: Invoice) => void; // Agregar onCreate como una prop
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ user, onCreate }) => {
  const [codigo, setCodigo] = useState<string>("");
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
            codigo,
            user_id: user?.id,
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
          <Grid item xs={12}>
            <TextField
              label="Código Producto"
              variant="outlined"
              fullWidth
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
    </div>
  );
};

export default InvoiceForm;
