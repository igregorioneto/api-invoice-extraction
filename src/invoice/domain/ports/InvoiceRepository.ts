import { Invoice } from "../entities/Invoice";

export interface InvoiceRepository {
  create(invoice: Invoice): Promise<void>;
  findAll(): Promise<Invoice[]>;
  findById(id: string): Promise<Invoice | null>;
}