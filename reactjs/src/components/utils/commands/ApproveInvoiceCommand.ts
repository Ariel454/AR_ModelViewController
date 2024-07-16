// commands/ApproveInvoiceCommand.ts
interface Command {
  execute(): Promise<void>;
}

class ApproveInvoiceCommand implements Command {
  constructor(private invoiceId: number) {}

  async execute() {
    const response = await fetch(
      `http://localhost:3000/api/invoices/${this.invoiceId}`,
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
}

class DenyInvoiceCommand implements Command {
  constructor(private invoiceId: number) {}

  async execute() {
    const response = await fetch(
      `http://localhost:3000/api/invoices/${this.invoiceId}`,
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

export { ApproveInvoiceCommand, DenyInvoiceCommand };
