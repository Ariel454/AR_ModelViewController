import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";

import ListClaims from "./ListClaims";
import { Claim } from "../../../types/claim";

interface CreateClaimFormProps {
  onCreate: (claimData: Claim) => void;
}

const CreateClaimForm: React.FC<CreateClaimFormProps> = ({ onCreate }) => {
  const [userId, setUserId] = useState<string>("");
  const [awardId, setAwardId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("
https://ar-mvc-api.vercel.app/api/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: parseInt(userId, 10),
          award_id: parseInt(awardId, 10),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear reclamo");
      }

      const newClaim = await response.json();
      onCreate(newClaim);
      setUserId("");
      setAwardId("");
      setMessage("Reclamo creado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error al crear reclamo");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
              label="ID de Premio"
              variant="outlined"
              fullWidth
              value={awardId}
              onChange={(e) => setAwardId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Crear Reclamo
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
      <ListClaims />
    </div>
  );
};

export default CreateClaimForm;
