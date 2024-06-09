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

interface Claim {
  id: number;
  user_id: number;
  award_id: number;
}

const ListClaims = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/claims");
        if (!response.ok) {
          throw new Error("Failed to fetch claims");
        }
        const data = await response.json();
        setClaims(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching claims:", error);
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const handleDeleteClaim = async (claimId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/claims/${claimId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete claim");
      }

      setClaims(claims.filter((claim) => claim.id !== claimId));
    } catch (error) {
      console.error("Error deleting claim:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="list of claims">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Award ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4}>Loading...</TableCell>
            </TableRow>
          ) : (
            claims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell>{claim.id}</TableCell>
                <TableCell>{claim.user_id}</TableCell>
                <TableCell>{claim.award_id}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/edit-claim/${claim.id}`}
                    variant="outlined"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    component={Link}
                    to={`/view-claim/${claim.id}`}
                    variant="outlined"
                    color="primary"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleDeleteClaim(claim.id)}
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

export default ListClaims;
