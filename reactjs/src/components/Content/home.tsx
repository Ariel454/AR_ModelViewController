import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import "./contentStyles.css";
import { Route, Routes } from "react-router-dom";
import EditUser from "../Management/UsersAdministration/EditUser";
import ViewUser from "../Management/UsersAdministration/ViewUser";
import CreateUserForm from "../Management/UsersAdministration/CreateUserForm";
import { User } from "../Layouts/ExtendedLayout";

interface ContentProps {}

const Content: React.FC<ContentProps> = ({}) => {
  const [users, setUsers] = useState<User[]>([]);

  const handleCreateUser = (newUser: User) => {
    console.log("Nuevo usuario:", newUser);
    setUsers([...users, newUser]);
  };

  return <Box className="container"></Box>;
};

export default Content;
