import pdf from "pdf-parse";
import { InvoiceRepository } from "../ports/InvoiceRepository";
import { CreateClientService } from "../../../client/domain/services/CreateClientService";
import { FindByIdClientService } from "../../../client/domain/services/FindByIdClientService";
import { CreateAddressService } from "../../../address/domain/services/CreateAddressService";
import { FindByIdAddressService } from "../../../address/domain/services/FindByIdAddressService";
import { FindByNumberClientService } from "../../../client/domain/services/FindByNumberClientService";
import { ExtractInfoService } from "./ExtractInfoService";

export class ExtractInvoiceService {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly createClientService: CreateClientService,
    private readonly findByIdClientService: FindByIdClientService,
    private readonly findByNumberClientService: FindByNumberClientService,
    private readonly createAddressService: CreateAddressService,
    private readonly findByIdAddressService: FindByIdAddressService,
    private readonly extractInfoService: ExtractInfoService,
  ) { }

  async execute(fileBuffer: Buffer[]) {
    for (const file of fileBuffer) {
      const data = await pdf(file);
      const invoiceData = await this.extractInfoService.execute(data.text);
      if (!invoiceData) {
        console.log('No information found in PDF!');
        continue;
      }
      const { client, address, invoice } = invoiceData;
      console.log(client, address, invoice);
    }
  }
}