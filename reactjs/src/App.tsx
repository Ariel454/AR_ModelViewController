import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateUserForm from "./components/Management/UsersAdministration/CreateUserForm";
import ListUsers from "./components/Management/UsersAdministration/ListUsers";
import EditUser from "./components/Management/UsersAdministration/EditUser";
import ViewUser from "./components/Management/UsersAdministration/ViewUser";
import Login from "./components/Login";
import MiniCore from "./components/MiniCore/MiniCore";
import ExtendedLayout from "./components/Layouts/ExtendedLayout";

export interface User {
  name: string;
  email: string;
  lastname: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleCreateUser = (newUser: User) => {
    console.log("Nuevo usuario:", newUser);
    setUsers([...users, newUser]);
  };

  return (
    // <MiniCore />
    <Router>
      <Routes>
        {!loggedIn ? (
          // Si el usuario no está autenticado, redirigir a la página de autenticación
          <Route path="*" element={<Navigate to="/authenticate" />} />
        ) : (
          <>
            <Route path="/*" element={<ExtendedLayout />} />
          </>
        )}
        <Route
          path="/authenticate"
          element={<Login setLoggedIn={setLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
