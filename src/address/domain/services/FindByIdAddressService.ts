import pdf from "pdf-parse";
import { AddressRepository } from "../ports/AddressRepository";

export class FindByIdAddressService {
  constructor(private readonly addressRepository: AddressRepository) { }

  async execute(id: string) {
    return await this.addressRepository.findById(id);
  }
}