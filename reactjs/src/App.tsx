import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateUserForm from './components/CreateUserForm';
import ListUsers from './components/ListUsers';
import { List } from '@mui/material';

interface User {
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const handleCreateUser = (newUser: User) => {
    // Aquí puedes enviar la solicitud al backend para crear un nuevo usuario
    console.log('Nuevo usuario:', newUser);
    setUsers([...users, newUser]);
  };

  return (
    <div>
      <h1>List of Users</h1>
      <CreateUserForm onCreate={handleCreateUser} />
      {/* Aquí puedes mostrar la lista de usuarios */}
      <ListUsers/>
    </div>
  );
}

export default App;