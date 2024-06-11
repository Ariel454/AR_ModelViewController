import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

interface EditAwardProps {}

const EditAward: React.FC<EditAwardProps> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const [codigo, setCodigo] = useState<string>("");
  const [etiqueta, setEtiqueta] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [precio, setPrecio] = useState<string>("");
  const [puntos, setPuntos] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchAward = async () => {
      try {
        const response = await fetch(`
https://ar-mvc-api.vercel.app/api/awards/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch award");
        }
        const award = await response.json();
        setCodigo(award.codigo);
        setEtiqueta(award.etiqueta);
        setDescripcion(award.descripcion);
        setPrecio(award.precio.toString());
        setPuntos(award.puntos.toString());
      } catch (error) {
        console.error("Error fetching award:", error);
      }
    };

    fetchAward();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `
https://ar-mvc-api.vercel.app/api/awards/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigo,
            etiqueta,
            precio: parseFloat(precio),
            puntos: parseInt(puntos, 10),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar premio");
      }

      setMessage("Premio actualizado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error al actualizar premio");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
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
            label="Etiqueta"
            variant="outlined"
            fullWidth
            value={etiqueta}
            onChange={(e) => setEtiqueta(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
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
        <Grid item xs={12} sm={6}>
          <TextField
            label="Puntos"
            variant="outlined"
            fullWidth
            type="number"
            value={puntos}
            onChange={(e) => setPuntos(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Actualizar Premio
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

export default EditAward;
