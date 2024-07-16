// InvoiceRepository.ts
import { Invoice } from "../../../types/invoice";

export interface InvoiceRepository {
  create(invoiceData: Invoice): Promise<Invoice>;
}
