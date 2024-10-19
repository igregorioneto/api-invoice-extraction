import pdf from "pdf-parse";
import { InvoiceRepository } from "../ports/InvoiceRepository";

export class FindAllInvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) { }

  async execute() {
    return await this.invoiceRepository.findAll();
  }
}