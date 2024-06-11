import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { Invoice } from "../../../types/invoice";

const ViewInvoice = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(
          `
https://ar-mvc-api.vercel.app/api/invoices/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch invoice");
        }
        const data = await response.json();
        setInvoice(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoice:", error);
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!invoice) {
    return <Typography>Invoice not found</Typography>;
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h5">Invoice Details</Typography>
          <Typography variant="body1">ID: {invoice.id}</Typography>
          <Typography variant="body1">Código: {invoice.codigo}</Typography>
          <Typography variant="body1">User ID: {invoice.user_id}</Typography>
          <Typography variant="body1">Fecha: {invoice.fecha}</Typography>
          <Typography variant="body1">Precio: {invoice.precio}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ViewInvoice;
