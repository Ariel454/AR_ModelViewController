import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Award } from "../../../types/award";
import { User } from "../../../types/user";

interface StoreProps {
  user: User | null;
  setUser: (data: any) => void;
}

const Store: React.FC<StoreProps> = ({ user, setUser }) => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch(
          "https://ar-mvc-api.vercel.app/api/awards"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch awards");
        }
        const data = await response.json();
        setAwards(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching awards:", error);
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  const handleClaimAward = async (awardId: number, awardPoints: number) => {
    if (user && user.puntos && user.puntos >= awardPoints) {
      try {
        const response = await fetch(
          "https://ar-mvc-api.vercel.app/api/claims",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user.id,
              award_id: awardId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to claim award");
        }

        // Restar los puntos del usuario
        const updatedPoints = user.puntos - awardPoints;

        // Actualizar los puntos del usuario
        const updatedUser = { ...user, puntos: updatedPoints };

        setUser(updatedUser);

        // Actualizar al usuario en la base de datos
        await fetch(`https://ar-mvc-api.vercel.app/api/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });

        setSnackbarMessage("¡Premio reclamado exitosamente!");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error claiming award:", error);
      }
    } else {
      setSnackbarMessage(
        "¡No tienes suficientes puntos para reclamar este premio!"
      );
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
      <div>
        <p>
          Hola! {user ? user.name : ""} Tienes {user ? user.puntos : 0} puntos
          disponibles
        </p>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="list of awards">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Etiqueta</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Puntos</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : (
              awards.map((award: Award) => (
                <TableRow key={award.id}>
                  <TableCell>{award.codigo}</TableCell>
                  <TableCell>{award.etiqueta}</TableCell>
                  <TableCell>{award.descripcion}</TableCell>
                  <TableCell>{award.precio}</TableCell>
                  <TableCell>{award.puntos}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleClaimAward(award.id, award.puntos)}
                      variant="outlined"
                      color="primary"
                    >
                      Reclamar premio
                    </Button>
                    <Button
                      component={Link}
                      to={`/view-award/${award.id}`}
                      variant="outlined"
                      color="primary"
                    >
                      Visualizar premio
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Store;
