import { Address } from "../entities/Address";

export interface AddressRepository {
  create(invoice: Address): Promise<Address | null>;
  findById(id: string): Promise<Address | null>;
  findByCepAddress(cep: string): Promise<Address | null>;
}