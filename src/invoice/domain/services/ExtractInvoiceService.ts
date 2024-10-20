import pdf from "pdf-parse";
import { InvoiceRepository } from "../ports/InvoiceRepository";
import { CreateClientService } from "../../../client/domain/services/CreateClientService";
import { FindByIdClientService } from "../../../client/domain/services/FindByIdClientService";
import { CreateAddressService } from "../../../address/domain/services/CreateAddressService";
import { FindByIdAddressService } from "../../../address/domain/services/FindByIdAddressService";
import { FindByNumberClientService } from "../../../client/domain/services/FindByNumberClientService";
import { ExtractInfoService } from "./ExtractInfoService";
import { Client } from "../../../client/domain/entities/Client";
import { FindByCepAddressService } from "../../../address/domain/services/FindByCepAddressService";
import { Address } from "../../../address/domain/entities/Address";
import { Invoice } from "../entities/Invoice";

export class ExtractInvoiceService {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly createClientService: CreateClientService,
    private readonly findByIdClientService: FindByIdClientService,
    private readonly findByNumberClientService: FindByNumberClientService,
    private readonly createAddressService: CreateAddressService,
    private readonly findByIdAddressService: FindByIdAddressService,
    private readonly findByCepAddressService: FindByCepAddressService,
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

      let clientData = await this.findByNumberClientService.execute(client.numberClient);
      if (!clientData) {
        const data = new Client({ 
          name: client.name, 
          numberClient: client.numberClient,
          document:  client.document,
        });
        clientData = await this.createClientService.execute(data);
      }

      let addressData = await this.findByCepAddressService.execute(address.cep);
      if (!addressData && clientData) {
        const data = new Address({
          cep: address.cep,
          city: address.city,
          district: address.district,
          number: address.number,
          state: address.state,
          street: address.street,
          clientId: clientData.id
        });
        addressData = await this.createAddressService.execute(data);
      }

      if (addressData && clientData) {
        const data = new Invoice({
          compensatedEnergyAmount: invoice.compensatedEnergyAmount,
          compensatedEnergyQuantity: invoice.compensatedEnergyQuantity,
          eletricalEnergyAmount: invoice.eletricalEnergyAmount,
          eletricalEnergyQuantity: invoice.eletricalEnergyQuantity,
          energySCEEEICMSAmount: invoice.energySCEEEICMSAmount,
          energySCEEEICMSQuantity: invoice.energySCEEEICMSQuantity,
          monthReference: invoice.monthReference,
          publicLightingContribution: invoice.publicLightingContribution,
          addressId: addressData.id
        })
        await this.invoiceRepository.create(data);
      }
    }
    return;
  }
}