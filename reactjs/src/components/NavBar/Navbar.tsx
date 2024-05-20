import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Box } from "@mui/material";
import './navbarStyles.css';
import Logo from '../../assets/images/logo_pichincha.svg';
import { User } from '../Layouts/ExtendedLayout';

interface Props {
  userData: User | null;
}

const Navbar: React.FC<Props> = ({ userData }) => {
  const getInitials = (name: string) => {
    const initials = name.split(' ');
    return initials.length > 1 ? `${initials[0][0]}${initials[1][0]}` : `${initials[0][0]}`;
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="toolbar">
        <IconButton className="logo" edge="start" color="inherit" aria-label="menu">
          <img src={Logo} alt="Logo" />
        </IconButton>
        <div className="grow" />
        {userData && (
          <Box className="user-info" display="flex" alignItems="center">
            <Avatar className="user-avatar">{getInitials(`${userData.name} ${userData.lastname}`)}</Avatar>
            <Typography className="user-name" variant="body1" >{`${userData.name} ${userData.lastname}`}</Typography>
            <div className="divider vertical" />
            <Button className="logout-button" >Salir</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
