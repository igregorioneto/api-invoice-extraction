import { PrismaClient } from "@prisma/client";
import { InvoiceRepository } from "../../domain/ports/InvoiceRepository";

const prisma = new PrismaClient();

export class PrismaInvoiceRepository implements InvoiceRepository {

}