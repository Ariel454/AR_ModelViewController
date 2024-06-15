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
import { User } from "../../../types/user";

interface ApproveInvoicesProps {
  setUser: (data: any) => void;
}

const ApproveInvoices: React.FC<ApproveInvoicesProps> = ({ setUser }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchDeniedInvoices = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/invoices?estado=PENDIENTE"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch denied invoices");
        }
        const data = await response.json();
        setInvoices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching denied invoices:", error);
        setLoading(false);
      }
    };

    fetchDeniedInvoices();
  }, []); // Sin dependencias

  // Callback para actualizar las facturas después de aprobar o denegar una factura
  const updateInvoices = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/invoices?estado=PENDIENTE`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch denied invoices");
      }
      const data = await response.json();
      setInvoices(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching denied invoices:", error);
      setLoading(false);
    }
  };

  const handleApproveInvoice = async (invoiceId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/invoices/${invoiceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estado: "APROBADO",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve invoice");
      }

      const approvedInvoice = invoices.find(
        (invoice) => invoice.id === invoiceId
      );

      if (!approvedInvoice) {
        throw new Error("Approved invoice not found");
      }

      // Obtener al usuario asociado a la factura
      const userResponse = await fetch(
        `http://localhost:3000/api/users/${approvedInvoice.user_id}`
      );
      const user = await userResponse.json();
      console.log("User updated" + JSON.stringify(user));
      // Verificar si el usuario existe
      if (!user) {
        throw new Error("User not found");
      }

      // Obtener reclamos del usuario
      const claimsResponse = await fetch(`http://localhost:3000/api/claims`);
      const claims = await claimsResponse.json();

      // Filtrar reclamos del usuario actual
      const userClaims = claims.filter(
        (claim: any) => claim.user_id === user.id
      );

      // Agrupar reclamos por premio (award_id)
      const groupedClaims = userClaims.reduce((acc: any, claim: any) => {
        acc[claim.award_id] = acc[claim.award_id] || [];
        acc[claim.award_id].push(claim);
        return acc;
      }, {});

      // Calcular bonificaciones acumulativas
      let totalBonus = 0;
      for (const awardId in groupedClaims) {
        const claimCount = groupedClaims[awardId].length;
        if (claimCount > 1) {
          // Calcular bono acumulativo (0.1% por cada reclamo adicional)
          const bonus = (claimCount - 1) * 0.001;
          totalBonus += bonus;
        }
      }

      const bonusPercentage = await calculateBonus(approvedInvoice.user_id);
      const points =
        approvedInvoice.precio * (0.05 + bonusPercentage + totalBonus / 100);

      // Sumar bono a los puntos del usuario
      user.puntos += points;

      // Actualizar al usuario en la base de datos
      await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === invoiceId
            ? { ...invoice, estado: Status.APROBADO }
            : invoice
        )
      );
      setMessage("Factura aprobada con éxito");
      await updateInvoices();
    } catch (error) {
      console.error("Error approving invoice:", error);
    }
  };

  const calculateBonus = async (userId: number): Promise<number> => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/invoices/approved/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch approved invoices");
      }
      const userInvoices: Invoice[] = await response.json();

      if (userInvoices.length === 0) {
        return 0; // Si no hay facturas aprobadas, no hay bonificación
      }

      // Ordenar las facturas por fecha (más antiguas primero)
      userInvoices.sort(
        (a: Invoice, b: Invoice) =>
          new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
      );

      let totalBonus = 0;
      let currentBonus = 0;
      let currentStartDate = new Date(userInvoices[0].fecha);
      let currentEndDate = new Date(currentStartDate);
      currentEndDate.setDate(currentEndDate.getDate() + 7); // Sumar 7 días

      userInvoices.forEach((invoice: Invoice) => {
        const invoiceDate = new Date(invoice.fecha);
        if (invoiceDate >= currentStartDate && invoiceDate <= currentEndDate) {
          currentBonus += 0.3;
        } else {
          currentStartDate = new Date(invoiceDate);
          currentEndDate = new Date(currentStartDate);
          currentEndDate.setDate(currentEndDate.getDate() + 7);
          currentBonus = 0.3;
        }
      });

      totalBonus += currentBonus; // Sumar el bonus actual al total después del bucle
      return totalBonus;
    } catch (error) {
      console.error("Error calculating bonus:", error);
      return 0;
    }
  };

  const handleDenyInvoice = async (invoiceId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/invoices/${invoiceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estado: "DENEGADO",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to deny invoice");
      }

      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === invoiceId
            ? { ...invoice, estado: Status.DENEGADO }
            : invoice
        )
      );
      setMessage("Factura denegada con éxito");
      await updateInvoices();
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
                    onClick={() => handleApproveInvoice(invoice.id)}
                  >
                    Aprobar
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDenyInvoice(invoice.id)}
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
