import pdf from "pdf-parse";
import { InvoiceRepository } from "../ports/InvoiceRepository";
import { CreateClientService } from "../../../client/domain/services/CreateClientService";
import { FindByIdClientService } from "../../../client/domain/services/FindByIdClientService";
import { CreateAddressService } from "../../../address/domain/services/CreateAddressService";
import { FindByIdAddressService } from "../../../address/domain/services/FindByIdAddressService";

export class ExtractInvoiceService {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly createClientService: CreateClientService,
    private readonly findByIdClientService: FindByIdClientService,
    private readonly createAddressService: CreateAddressService,
    private readonly findByIdAddressService: FindByIdAddressService,
  ) { }

  async execute(fileBuffer: Buffer[]) {
    for (const file of fileBuffer) {
      const data = await pdf(file);
      console.log(data.text);
    }
  }
}