import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { Navigate } from 'react-router-dom';

interface Props {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
      });
      if (!response.ok) {
        throw new Error('Usuario o contraseña incorrectos');
      }
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token); // Almacena el token en el almacenamiento local
      setLoggedIn(true);
      setToken(token);
      console.log(setLoggedIn);
      console.log("Token "+token);
    } catch (error) {
      setError('Usuario o contraseña incorrectos');
    }
  };
  
    // Si el usuario está autenticado, redirigir a la ruta '/menu'
    if (token) {
        return <Navigate to="/menu" />;
      }
    

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
          style={{ marginTop: '1rem' }}
        >
          Iniciar sesión
        </Button>
      </form>
    </Container>
  );
};

export default Login;
