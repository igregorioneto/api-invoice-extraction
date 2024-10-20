import pdf from "pdf-parse";
import { AddressRepository } from "../ports/AddressRepository";

export class FindByCepAddressService {
  constructor(private readonly addressRepository: AddressRepository) { }

  async execute(cep: string) {
    return await this.addressRepository.findByCepAddress(cep);
  }
}