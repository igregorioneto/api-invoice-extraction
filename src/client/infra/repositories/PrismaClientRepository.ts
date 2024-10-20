import { PrismaClient } from "@prisma/client";
import { ClientRepository } from '../../domain/ports/ClientRepository';
import { Client } from '../../domain/entities/Client';

const prisma = new PrismaClient();
export class PrismaClientRepository implements ClientRepository {
  async create(client: Client): Promise<void> {
    await prisma.client.create({
      data: client
    });
  }

  async findById(id: string): Promise<Client | null> {
    return await prisma.client.findUnique({ where: { id } });
  }

  async findByNumberClient(numberClient: string): Promise<Client | null> {
    return await prisma.client.findFirst({ where: { numberClient } });
  }
}