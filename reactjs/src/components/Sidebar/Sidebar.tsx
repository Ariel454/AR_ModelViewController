import React, { useState } from "react";
import "./sidebarStyles.css";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Badge,
  ButtonBase,
} from "@mui/material";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  options: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ options }) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };

  return (
    <div className="sidebar">
      <List>
        <ListItem component="div">
          <ButtonBase component={NavLink} to="/gestion-usuarios">
            <ListItemText primary="Gestión de Usuarios" />
          </ButtonBase>
        </ListItem>
        <ListItem component="div">
          <ButtonBase component={NavLink} to="/subir-factura">
            <ListItemText primary="Subir Factura" />
          </ButtonBase>
        </ListItem>
        <ListItem component="div">
          <ButtonBase component={NavLink} to="/gestion-facturas">
            <ListItemText primary="Gestión de Facturas" />
          </ButtonBase>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
