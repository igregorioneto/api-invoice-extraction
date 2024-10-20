import { PrismaClient } from "@prisma/client";
import { AddressRepository } from "../../domain/ports/AddressRepository";
import { Address } from '../../domain/entities/Address';

const prisma = new PrismaClient();
export class PrismaAddressRepository implements AddressRepository {
  async create(address: Address): Promise<Address | null> {
    return await prisma.address.create({
      data: address
    });
  }

  async findById(id: string): Promise<Address | null> {
    return await prisma.address.findUnique({ where: { id } });
  }

  async findByCepAddress(cep: string): Promise<Address | null> {
    return await prisma.address.findFirst({ where: { cep } });
  }

}