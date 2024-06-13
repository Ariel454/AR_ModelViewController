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
} from "@mui/material";
import { Link } from "react-router-dom";
import { Award } from "../../../types/award";

const ListAwards = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/awards");
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

  const handleDeleteAward = async (awardId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/awards/${awardId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete award");
      }

      setAwards(awards.filter((award) => award.id !== awardId));
    } catch (error) {
      console.error("Error deleting award:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="list of awards">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
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
              <TableCell colSpan={6}>Loading...</TableCell>
            </TableRow>
          ) : (
            awards.map((award) => (
              <TableRow key={award.id}>
                <TableCell>{award.id}</TableCell>
                <TableCell>{award.codigo}</TableCell>
                <TableCell>{award.etiqueta}</TableCell>
                <TableCell>{award.descripcion}</TableCell>
                <TableCell>{award.precio}</TableCell>
                <TableCell>{award.puntos}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/edit-award/${award.id}`}
                    variant="outlined"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    component={Link}
                    to={`/view-award/${award.id}`}
                    variant="outlined"
                    color="primary"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleDeleteAward(award.id)}
                    variant="outlined"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListAwards;
