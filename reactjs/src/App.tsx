import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreateUserForm from './components/CreateUserForm';
import ListUsers from './components/ListUsers';
import EditUser from './components/EditUser';
import ViewUser from './components/ViewUser';
import Login from './components/Login';

interface User {
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleCreateUser = (newUser: User) => {
    console.log('Nuevo usuario:', newUser);
    setUsers([...users, newUser]);
  };

  return (
    <Router>
      <Routes>
        {!loggedIn ? (
          // Si el usuario no está autenticado, redirigir a la página de autenticación
          <Route path="*" element={<Navigate to="/authenticate" />} />
        ) : (
          // Si el usuario está autenticado, mostrar las rutas normales
          <>
            <Route path="/menu" element={<CreateUserForm onCreate={handleCreateUser} />} />
            <Route path="/edit/:id" element={<EditUser />} />
            <Route path="/view/:id" element={<ViewUser />} />
          </>
        )}
        <Route path="/authenticate" element={<Login setLoggedIn={setLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
