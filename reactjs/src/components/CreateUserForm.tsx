import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';

import ListUsers from './ListUsers';

interface CreateUserFormProps {
  onCreate: (userData: { name: string, email: string }) => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onCreate }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Error al crear usuario');
      }

      const newUser = await response.json();
      onCreate(newUser);
      setName('');
      setEmail('');
      setPassword('');
      setMessage('Usuario creado exitosamente');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al crear usuario');
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
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Create User
          </Button>
        </Grid>
        {message && (
          <Grid item xs={12}>
            <Typography variant="body1" color={message.startsWith('Error') ? 'error' : 'success'}>
              {message}
            </Typography>
          </Grid>
        )}
      </Grid>
    </form>
    <ListUsers/>
    </div>

  );
};

export default CreateUserForm;
