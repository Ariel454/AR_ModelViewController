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

import { Invoice, Status } from "../../../types/invoice";
import { invoiceFacade } from "../../utils/services/InvoiceFacade";
import { ApproveInvoiceCommand } from "../../utils/commands/ApproveInvoiceCommand";
import { DenyInvoiceCommand } from "../../utils/commands/ApproveInvoiceCommand";
interface ApproveInvoicesProps {
  setUser: (data: any) => void;
}

const ApproveInvoices: React.FC<ApproveInvoicesProps> = ({ setUser }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await invoiceFacade.fetchPendingInvoices();
        setInvoices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleApproveInvoice = async (invoiceId: number | undefined) => {
    if (invoiceId === undefined) {
      console.error("El ID de la factura no está definido");
      return; // O maneja el error como prefieras
    }
    try {
      const command = new ApproveInvoiceCommand(invoiceId);
      await command.execute();
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === invoiceId
            ? { ...invoice, estado: Status.APROBADO }
            : invoice
        )
      );
      setMessage("Factura aprobada con éxito");
    } catch (error) {
      console.error("Error approving invoice:", error);
    }
  };

  const handleDenyInvoice = async (invoiceId: number | undefined) => {
    if (invoiceId === undefined) {
      console.error("El ID de la factura no está definido");
      return; // O maneja el error como prefieras
    }
    try {
      const command = new DenyInvoiceCommand(invoiceId);
      await command.execute();
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === invoiceId
            ? { ...invoice, estado: Status.DENEGADO }
            : invoice
        )
      );
      setMessage("Factura denegada con éxito");
    } catch (error) {
      console.error("Error denying invoice:", error);
    }
  };

  const handleCloseMessage = () => {
    setMessage("");
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
                    variant="outlined"
                    color="primary"
                    onClick={() => handleApproveInvoice(invoice?.id)}
                  >
                    Aprobar
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDenyInvoice(invoice?.id)}
                  >
                    Denegar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
        message={message}
      />
    </TableContainer>
  );
};

export default ApproveInvoices;
