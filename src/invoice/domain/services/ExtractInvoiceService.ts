import pdf from "pdf-parse";
import { InvoiceRepository } from "../ports/InvoiceRepository";

export class ExtractInvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) { }

  async execute(fileBuffer: Buffer[]) {
    for (const file of fileBuffer) {
      const data = await pdf(file);
      console.log(data.text);
    }
  }
}