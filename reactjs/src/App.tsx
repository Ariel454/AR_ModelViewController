import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Routes
import './App.css';
import CreateUserForm from './components/CreateUserForm';
import ListUsers from './components/ListUsers';
import EditUser from './components/EditUser'; 
import ViewUser
 from './components/ViewUser';
interface User {
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = React.useState<User[]>([]);

  const handleCreateUser = (newUser: User) => {
    console.log('Nuevo usuario:', newUser);
    setUsers([...users, newUser]);
  };

  return (
    <Router> 
      <div>
        <h1>List of Users</h1>
        <CreateUserForm onCreate={handleCreateUser} />
        <Routes> 
          <Route path="/" element={<ListUsers />} /> 
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/view/:id" element={<ViewUser />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
