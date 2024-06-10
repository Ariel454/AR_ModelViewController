import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

interface EditClaimProps {}

const EditClaim: React.FC<EditClaimProps> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const [userId, setUserId] = useState<string>("");
  const [awardId, setAwardId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        const response = await fetch(
          `https://ar-mvc-api.vercel.app/api/claims/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch claim");
        }
        const claim = await response.json();
        setUserId(claim.user_id.toString());
        setAwardId(claim.award_id.toString());
      } catch (error) {
        console.error("Error fetching claim:", error);
      }
    };

    fetchClaim();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://ar-mvc-api.vercel.app/api/claims/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: parseInt(userId, 10),
            award_id: parseInt(awardId, 10),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el claim");
      }

      setMessage("Claim actualizado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error al actualizar el claim");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
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
            Actualizar Claim
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

export default EditClaim;
