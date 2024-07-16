// CreateClaimForm.tsx
import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import ListClaims from "./ListClaims";
import { Claim } from "../../../types/claim";
import { ClaimService } from "../../utils/services/ClaimService";
import { ApiClaimRepository } from "../../utils/repositories/ClaimRepository";

interface CreateClaimFormProps {
  onCreate: (claimData: Claim) => void;
}

const CreateClaimForm: React.FC<CreateClaimFormProps> = ({ onCreate }) => {
  const [userId, setUserId] = useState<string>("");
  const [awardId, setAwardId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const claimService = new ClaimService(new ApiClaimRepository());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const newClaim = await claimService.createClaim({
        user_id: parseInt(userId, 10),
        award_id: parseInt(awardId, 10),
      });

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
