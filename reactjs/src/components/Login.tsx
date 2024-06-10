import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../types/user";

interface Props {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  user: User | null;
}

const Login: React.FC<Props> = ({ setLoggedIn, setUser, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Al montar el componente, revisa si hay un token en el localStorage
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      // Si hay un token guardado
      try {
        const decodedToken = JSON.parse(atob(savedToken.split(".")[1]));
        if (decodedToken && decodedToken.user) {
          setUser(decodedToken.user); // Establece el usuario en el estado
          setLoggedIn(true);
          navigate("/"); // Redirigir a la página principal o la ruta deseada
        } else {
          console.error("El token no contiene información del usuario.");
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, [setUser, setLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("https://ar-mvc-api.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password: password }),
      });
      if (!response.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }
      const data = await response.json();
      const { token, user } = data;
      localStorage.setItem("token", token); // Almacena el token en el almacenamiento local
      setUser(user); // Establece el usuario en el estado
      setLoggedIn(true);
      navigate("/"); // Redirigir a la página principal o la ruta deseada
    } catch (error) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Iniciar sesión
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo electrónico"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Contraseña"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: "1rem" }}
        >
          Iniciar sesión
        </Button>
      </form>
    </Container>
  );
};

export default Login;
