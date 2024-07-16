// ApiInvoiceRepository.ts
import { Invoice } from "../../../types/invoice";
import { InvoiceRepository } from "../interfaces/InvoiceInterface";

export class ApiInvoiceRepository implements InvoiceRepository {
  async create(invoiceData: Invoice): Promise<Invoice> {
    const response = await fetch("https://ar-mvc-api.vercel.app/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });

    if (!response.ok) {
      throw new Error("Error al crear factura");
    }

    return response.json();
  }
}
