import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import ListUsers from "./ListUsers";
import { User } from "../../../types/user";

interface CreateUserFormProps {
  onCreate: (userData: User) => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onCreate }) => {
  const [name, setName] = useState<string>("");
  const [codigo, setCodigo] = useState<string>("");
  const [cedula, setCedula] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");
  const [puntos, setPuntos] = useState<string>("");
  const [rol, setRol] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          codigo,
          cedula,
          email,
          password,
          direccion,
          puntos: parseInt(puntos, 10),
          rol,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear usuario");
      }

      const newUser = await response.json();
      onCreate(newUser);
      setName("");
      setCodigo("");
      setCedula("");
      setEmail("");
      setPassword("");
      setDireccion("");
      setPuntos("");
      setRol("");
      setMessage("Usuario creado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error al crear usuario");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
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
              label="Cédula"
              variant="outlined"
              fullWidth
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contraseña"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección"
              variant="outlined"
              fullWidth
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Rol</InputLabel>
              <Select
                value={rol}
                onChange={(e) => setRol(e.target.value as string)}
                label="Rol"
              >
                <MenuItem value={"ADM"}>Administrador</MenuItem>
                <MenuItem value={"COM"}>Comercial</MenuItem>
                <MenuItem value={"CLI"}>Cliente</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Crear Usuario
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
      <ListUsers />
    </div>
  );
};

export default CreateUserForm;
