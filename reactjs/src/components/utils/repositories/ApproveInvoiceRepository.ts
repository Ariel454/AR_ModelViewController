// repositories/ApproveInvoiceRepository.ts
export {}; // This makes the file a module

class ApproveInvoiceRepository {
  async approveInvoice(invoiceId: number) {
    const response = await fetch(
      `http://localhost:3000/api/invoices/${invoiceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: "APROBADO" }),
      }
    );
    if (!response.ok) throw new Error("Failed to approve invoice");
    return response.json();
  }

  async denyInvoice(invoiceId: number) {
    const response = await fetch(
      `http://localhost:3000/api/invoices/${invoiceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: "DENEGADO" }),
      }
    );
    if (!response.ok) throw new Error("Failed to deny invoice");
    return response.json();
  }
}

export const approveInvoiceRepository = new ApproveInvoiceRepository();
