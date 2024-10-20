import pdf from "pdf-parse";
import { AddressRepository } from "../ports/AddressRepository";
import { Address } from "../entities/Address";

export class CreateAddressService {
  constructor(private readonly addressRepository: AddressRepository) { }

  async execute(address: Address) {
    return await this.addressRepository.create(address);
  }
}