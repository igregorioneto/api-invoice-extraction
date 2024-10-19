import { Address } from "../entities/Address";

export interface AddressRepository {
  create(invoice: Address): Promise<void>;
  findById(id: string): Promise<Address | null>;
}