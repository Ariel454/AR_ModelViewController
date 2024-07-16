// InvoiceService.ts
import { Invoice } from "../../../types/invoice";
import { InvoiceRepository } from "../interfaces/InvoiceInterface";

export class InvoiceService {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async createInvoice(invoiceData: Invoice): Promise<Invoice> {
    return this.invoiceRepository.create(invoiceData);
  }
}
