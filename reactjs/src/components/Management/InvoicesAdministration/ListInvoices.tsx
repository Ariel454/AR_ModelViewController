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
import { Invoice } from "../../../types/invoice";

const ListInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("
https://ar-mvc-api.vercel.app/api/invoices");
        if (!response.ok) {
          throw new Error("Failed to fetch invoices");
        }
        const data = await response.json();
        setInvoices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleDeleteInvoice = async (invoiceId: number) => {
    try {
      const response = await fetch(
        `
https://ar-mvc-api.vercel.app/api/invoices/${invoiceId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete invoice");
      }

      setInvoices(invoices.filter((invoice) => invoice.id !== invoiceId));
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="list of invoices">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6}>Loading...</TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.codigo}</TableCell>
                <TableCell>{invoice.user_id}</TableCell>
                <TableCell>{invoice.fecha}</TableCell>
                <TableCell>{invoice.precio}</TableCell>
                <TableCell>{invoice.estado}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/edit-invoice/${invoice.id}`}
                    variant="outlined"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    component={Link}
                    to={`/view-invoice/${invoice.id}`}
                    variant="outlined"
                    color="primary"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleDeleteInvoice(invoice.id)}
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

export default ListInvoices;
