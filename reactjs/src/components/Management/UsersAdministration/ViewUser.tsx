import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { useParams } from "react-router-dom";

interface User {
  id: number;
  name: string;
  codigo: string;
  cedula: string;
  email: string;
  password: string;
  direccion: string;
  puntos: number;
}

const ViewUser = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://ar-mvc-api.vercel.app/api/users/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h5">User Details</Typography>
          <Typography variant="body1">ID: {user.id}</Typography>
          <Typography variant="body1">Name: {user.name}</Typography>
          <Typography variant="body1">Código: {user.codigo}</Typography>
          <Typography variant="body1">Cédula: {user.cedula}</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Typography variant="body1">Password: {user.password}</Typography>
          <Typography variant="body1">Dirección: {user.direccion}</Typography>
          <Typography variant="body1">Puntos: {user.puntos}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ViewUser;
