import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { Claim } from "../../../types/claim";

const ViewClaim = () => {
  const { id } = useParams<{ id: string }>();
  const [claim, setClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/claims/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch claim");
        }
        const data = await response.json();
        setClaim(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching claim:", error);
        setLoading(false);
      }
    };

    fetchClaim();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!claim) {
    return <Typography>Claim not found</Typography>;
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h5">Claim Details</Typography>
          <Typography variant="body1">ID: {claim.id}</Typography>
          <Typography variant="body1">User ID: {claim.user_id}</Typography>
          <Typography variant="body1">Award ID: {claim.award_id}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ViewClaim;
