import React, { useState } from "react";
import "./sidebarStyles.css";
import { List, ListItem, ListItemText, ButtonBase } from "@mui/material";
import { NavLink } from "react-router-dom";
import { User } from "../../types/user";

interface SidebarProps {
  user: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const getOptionsByRole = (user: User | null) => {
    switch (user?.rol) {
      case "ADM":
        return [
          { path: "/gestion-usuarios", label: "Gestión de Usuarios" },
          { path: "/subir-factura", label: "Subir Factura" },
          { path: "/gestion-facturas", label: "Gestión de Facturas" },
          { path: "/aprobar-facturas", label: "Aprobar Facturas" },
          { path: "/gestion-reclamos", label: "Gestión de Reclamos" },
          { path: "/gestion-premios", label: "Gestión de Premios" },
          { path: "/reclamar-premios", label: "Reclamar Premios" },
          { path: "/ver-stats", label: "Ver Estadisticas" },
        ];
      case "COM":
        return [
          { path: "/gestion-facturas", label: "Gestión de Facturas" },
          { path: "/aprobar-facturas", label: "Aprobar Facturas" },
          { path: "/gestion-premios", label: "Gestión de Premios" },
        ];
      case "CLI":
        return [
          { path: "/subir-factura", label: "Subir Factura" },
          { path: "/reclamar-premios", label: "Reclamar Premios" },
        ];

      default:
        return [];
    }
  };

  const options = getOptionsByRole(user);

  return (
    <div className="sidebar">
      <List>
        {options.map((option, index) => (
          <ListItem key={index} component="div">
            <ButtonBase component={NavLink} to={option.path}>
              <ListItemText primary={option.label} />
            </ButtonBase>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
