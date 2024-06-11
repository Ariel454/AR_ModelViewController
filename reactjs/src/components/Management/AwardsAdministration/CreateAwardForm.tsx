import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";

import ListAwards from "./ListAwards";
import { Award } from "../../../types/award";

interface CreateAwardFormProps {
  onCreate: (awardData: Award) => void;
}

const CreateAwardForm: React.FC<CreateAwardFormProps> = ({ onCreate }) => {
  const [codigo, setCodigo] = useState<string>("");
  const [etiqueta, setEtiqueta] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [precio, setPrecio] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Calcula los puntos necesarios para el premio según el precio
      const puntos = Math.ceil(parseFloat(precio) / 0.8);

      const response = await fetch("
https://ar-mvc-api.vercel.app/api/awards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo,
          etiqueta,
          descripcion,
          precio: parseFloat(precio),
          puntos, // Utiliza los puntos calculados
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear premio");
      }

      const newAward = await response.json();
      onCreate(newAward);
      setCodigo("");
      setEtiqueta("");
      setDescripcion("");
      setPrecio("");
      setMessage("Premio creado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error al crear premio");
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
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Crear Premio
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
      <ListAwards />
    </div>
  );
};

export default CreateAwardForm;
