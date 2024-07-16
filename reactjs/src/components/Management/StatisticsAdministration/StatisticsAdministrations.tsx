import React, { useEffect } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useAdministrationReducer } from "./reducer";
import { Invoice, User } from "../../../types";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Nombre", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "facturas", headerName: "Facturas Subidas", width: 150 },
  { field: "puntos", headerName: "Puntos Ganados", width: 150 },
];

type UserStatistics = {
  id: number | undefined;
  name: string;
  email: string;
  facturas: number;
  puntos: number;
};

const StatisticsAdministration = () => {
  const { users, invoices, getUsers, getInvoices } = useAdministrationReducer();

  useEffect(() => {
    getUsers();
    getInvoices();
  }, [getUsers, getInvoices]);

  const calculateStatistics = (): UserStatistics[] => {
    const userStatistics: UserStatistics[] = users.map((user: User) => {
      const userInvoices = invoices.filter(
        (invoice: Invoice) => invoice.user_id === user.id
      );
      const totalPoints = userInvoices.reduce(
        (sum: number, invoice: Invoice) => sum + invoice.precio * 0.05,
        0
      );
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        facturas: userInvoices.length,
        puntos: totalPoints,
      };
    });

    userStatistics.sort((a, b) => b.facturas - a.facturas); // Ordenar por facturas subidas

    return userStatistics;
  };

  const userStatistics = calculateStatistics();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Estadísticas del Programa de Fidelización
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Usuarios con más puntos ganados
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Usuarios con más facturas subidas
              </Typography>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid rows={userStatistics} columns={columns} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsAdministration;
