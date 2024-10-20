import { PrismaClient } from "@prisma/client";
import { InvoiceRepository } from "../../domain/ports/InvoiceRepository";
import { Invoice } from '../../domain/entities/Invoice';

const prisma = new PrismaClient();
export class PrismaInvoiceRepository implements InvoiceRepository {
  async create(invoice: Invoice): Promise<void> {
    await prisma.invoice.create({
      data: invoice
    });
  }

  async findAll(): Promise<Invoice[]> {
    return await prisma.invoice.findMany({
      include: {
        address: {
          include: {
            client: true
          }
        }
      }
    });
  }

  async findById(id: string): Promise<Invoice | null> {
    return await prisma.invoice.findUnique({ where: { id } });
  }

}