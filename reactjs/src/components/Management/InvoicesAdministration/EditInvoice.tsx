import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

interface EditInvoiceProps {}

const EditInvoice: React.FC<EditInvoiceProps> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const [recibo, setRecibo] = useState<string>("");
  const [codigo, setCodigo] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [fecha, setFecha] = useState<string>("");
  const [precio, setPrecio] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/invoices/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch invoice");
        }
        const invoice = await response.json();
        setRecibo(invoice.recibo);
        setCodigo(invoice.codigo);
        setUserId(invoice.user_id);
        setFecha(invoice.fecha);
        setPrecio(invoice.precio.toString());
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };

    fetchInvoice();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/invoices/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recibo,
          codigo,
          user_id: parseInt(userId, 10),
          fecha,
          precio: parseFloat(precio),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar factura");
      }

      setMessage("Factura actualizada exitosamente");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error al actualizar factura");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Recibo"
            variant="outlined"
            fullWidth
            value={recibo}
            onChange={(e) => setRecibo(e.target.value)}
          />
        </Grid>
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
            Actualizar Factura
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
  );
};

export default EditInvoice;