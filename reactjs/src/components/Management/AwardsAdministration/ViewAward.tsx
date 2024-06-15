import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { useParams } from "react-router-dom";

const ViewAward = () => {
  const { id } = useParams<{ id: string }>();
  const [award, setAward] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAward = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/awards/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch award");
        }
        const data = await response.json();
        setAward(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching award:", error);
        setLoading(false);
      }
    };

    fetchAward();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!award) {
    return <Typography>Award not found</Typography>;
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h5">Detalles del premio</Typography>
          <Typography variant="body1">ID: {award.id}</Typography>
          <Typography variant="body1">Código: {award.codigo}</Typography>
          <Typography variant="body1">Etiqueta: {award.etiqueta}</Typography>
          <Typography variant="body1">
            Descripción: {award.descripcion}
          </Typography>
          <Typography variant="body1">Precio: {award.precio}</Typography>
          <Typography variant="body1">Puntos: {award.puntos}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ViewAward;
