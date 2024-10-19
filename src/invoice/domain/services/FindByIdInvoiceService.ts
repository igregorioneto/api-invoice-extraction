import pdf from "pdf-parse";
import { InvoiceRepository } from "../ports/InvoiceRepository";

export class FindByIdInvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) { }

  async execute(id: string) {
    return await this.invoiceRepository.findById(id);
  }
}