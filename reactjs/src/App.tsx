import React, { useEffect, useState } from "react";
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
import { User } from "./types/user";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        console.log("Decoded Token:", decodedToken); // Verifica el contenido del token en la consola
        if (decodedToken && decodedToken.user) {
          setUser(decodedToken.user); // Establece el estado del usuario
          console.log(decodedToken.user + "dasdsa");
          setLoggedIn(true);
        } else {
          console.error("El token no contiene información del usuario.");
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

  console.log("User:", user);
  console.log("Logged In:", loggedIn);

  return (
    <Router>
      <Routes>
        {!loggedIn ? (
          // Si el usuario no está autenticado, redirigir a la página de autenticación
          <Route path="*" element={<Navigate to="/authenticate" />} />
        ) : (
          <>
            <Route path="/*" element={<ExtendedLayout user={user} />} />
          </>
        )}
        <Route
          path="/authenticate"
          element={
            <Login user={user} setLoggedIn={setLoggedIn} setUser={setUser} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
