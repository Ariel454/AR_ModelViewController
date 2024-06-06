import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom'; 

interface EditUserProps {
}

const EditUser: React.FC<EditUserProps> = ({  }) => {
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const user = await response.json();
        setName(user.name);
        setEmail(user.email);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar usuario');
      }

      setMessage('Usuario actualizado exitosamente');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al actualizar usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{marginTop: 20}}>
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
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Update User
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
  );
};

export default EditUser;
