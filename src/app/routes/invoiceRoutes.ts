import { Router } from "express";
import { PrismaInvoiceRepository } from "../../invoice/infra/repositories/PrismaInvoiceRepository";
import { InvoiceController } from "../controllers/InvoiceController";
import { ExtractInvoiceService } from "../../invoice/domain/services/ExtractInvoiceService";
import { upload } from "../../shared/utils/multer";
import { FindAllInvoiceService } from "../../invoice/domain/services/FindAllInvoiceService";
import { FindByIdInvoiceService } from "../../invoice/domain/services/FindByIdInvoiceService";
import { CreateClientService } from "../../client/domain/services/CreateClientService";
import { PrismaClientRepository } from "../../client/infra/repositories/PrismaClientRepository";
import { PrismaAddressRepository } from "../../address/infra/repositories/PrismaAddressRepository";
import { FindByIdClientService } from "../../client/domain/services/FindByIdClientService";
import { CreateAddressService } from "../../address/domain/services/CreateAddressService";
import { FindByIdAddressService } from "../../address/domain/services/FindByIdAddressService";

const router = Router();

const prismaInviteRepository = new PrismaInvoiceRepository();
const prismaClientRepository = new PrismaClientRepository();
const prismaAddressRepository = new PrismaAddressRepository();
const createClientService = new CreateClientService(
  prismaClientRepository
);
const findByIdClientService = new FindByIdClientService(
  prismaClientRepository
);
const createAddressService = new CreateAddressService(
  prismaAddressRepository
);
const findByIdAddressService = new FindByIdAddressService(
  prismaAddressRepository
);

const extractInvoiceService = new ExtractInvoiceService(
  prismaInviteRepository,
  createClientService,
  findByIdClientService,
  createAddressService,
  findByIdAddressService
);

const findAllInvoiceService = new FindAllInvoiceService(
  prismaInviteRepository
);
const findByIdInvoiceService = new FindByIdInvoiceService(
  prismaInviteRepository
);

const invoiceController = new InvoiceController(
  extractInvoiceService,
  findAllInvoiceService,
  findByIdInvoiceService
);

/**
 * @swagger
 * /invoices:
 *  post:
 *    tags:
 *      - Invoices
 *    summary: Extract invoices
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              files:
 *                type: array
 *                items:
 *                  type: string
 *                  format: binary
 *                description: The PDF files to extract
 *    responses:
 *      201:
 *        description: Invoices extracted successfully
 *      400:
 *        description: Invalid input
 */
router.post('/', upload.array('files', 20), async (req, res, next) => {
  try {
    await invoiceController.extract(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * tags:
 *    - name: Invoices
 *      description: Endpoints related to invoices management
 * /invoices:
 *  get:
 *    tags:
 *       - Invoices
 *    summary: Return Find All Invoices
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    example: "uuid-invoice-1"
 *                  monthReference:
 *                    type: string
 *                    format: date-time
 *                    example: "2023-09-01T00:00:00.000Z"
 *                  eletricalEnergyQuantity:
 *                    type: integer
 *                    example: 500
 *                  eletricalEnergyAmount:
 *                    type: integer
 *                    example: 3000
 *                  energySCEEEICMSQuantity:
 *                    type: integer
 *                    example: 100
 *                  energySCEEEICMSAmount:
 *                    type: integer
 *                    example: 200
 *                  compensatedEnergyQuantity:
 *                    type: integer
 *                    example: 50
 *                  compensatedEnergyAmount:
 *                    type: integer
 *                    example: 150
 *                  publicLightingContribution:
 *                    type: integer
 *                    example: 80
 *                  address:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        example: "uuid-address-1"
 *                      street:
 *                        type: string
 *                        example: "Main St"
 *                      number:
 *                        type: string
 *                        example: "123"
 *                      district:
 *                        type: string
 *                        example: "Downtown"
 *                      city:
 *                        type: string
 *                        example: "Springfield"
 *                      state:
 *                        type: string
 *                        example: "IL"
 *                      cep:
 *                        type: string
 *                        example: "62704"
 *                      client:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            example: "uuid-client-1"
 *                          name:
 *                            type: string
 *                            example: "John Doe"
 *                          document:
 *                            type: string
 *                            example: "12345678900"
 *                          numberClient:
 *                            type: string
 *                            example: "001"
 */
router.get('/', async (req, res, next) => {
  try {
    await invoiceController.findAll(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /invoices/{id}:
 *  get:
 *    tags:
 *       - Invoices
 *    summary: Get Invoice by ID with related Address and Client
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the invoice
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: "f3e5b2b3-9a88-45a8-8d0f-29a62e3173ec"
 *                monthReference:
 *                  type: string
 *                  format: date-time
 *                  example: "2024-01-01T00:00:00.000Z"
 *                eletricalEnergyQuantity:
 *                  type: integer
 *                  example: 500
 *                eletricalEnergyAmount:
 *                  type: integer
 *                  example: 200
 *                energySCEEEICMSQuantity:
 *                  type: integer
 *                  example: 50
 *                energySCEEEICMSAmount:
 *                  type: integer
 *                  example: 20
 *                compensatedEnergyQuantity:
 *                  type: integer
 *                  example: 100
 *                compensatedEnergyAmount:
 *                  type: integer
 *                  example: 50
 *                publicLightingContribution:
 *                  type: integer
 *                  example: 15
 *                address:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      example: "9f2b5a2b-bf45-4fbb-b0e4-1c59d23e9b1e"
 *                    street:
 *                      type: string
 *                      example: "Main Street"
 *                    number:
 *                      type: string
 *                      example: "123"
 *                    district:
 *                      type: string
 *                      example: "Central District"
 *                    city:
 *                      type: string
 *                      example: "Some City"
 *                    state:
 *                      type: string
 *                      example: "State"
 *                    cep:
 *                      type: string
 *                      example: "12345-678"
 *                    client:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                          example: "d8f1b8a6-5a4d-4fba-83b4-54e3d2b27f1d"
 *                        name:
 *                          type: string
 *                          example: "John Doe"
 *                        document:
 *                          type: string
 *                          example: "12345678900"
 *                        numberClient:
 *                          type: string
 *                          example: "C123456"
 *      404:
 *        description: Invoice not found
 */
router.get('/:id', async (req, res, next) => {
  try {
    await invoiceController.findById(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;