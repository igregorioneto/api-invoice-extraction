import { Request, Response } from "express";
import { ExtractInvoiceService } from "../../invoice/domain/services/ExtractInvoiceService";
import { FindAllInvoiceService } from "../../invoice/domain/services/FindAllInvoiceService";
import { FindByIdInvoiceService } from "../../invoice/domain/services/FindByIdInvoiceService";

export class InvoiceController {
  constructor(
    private readonly extractInvoiceService: ExtractInvoiceService,
    private readonly findAllInvoiceService: FindAllInvoiceService,
    private readonly findByIdInvoiceService: FindByIdInvoiceService
  ) {}

  async extract(req: Request, res: Response) {
    const pdfs = req.files as Express.Multer.File[];
    try {
      if (!pdfs) return res.status(401).send({ message: 'PDFs required!', success: false })
      const fileBuffers = pdfs.map(file => file.buffer);
      await this.extractInvoiceService.execute(fileBuffers);
      return res.status(201).send({ message: 'Invoice extracted successfully', success: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).send({ message: error.message, success: false });
      }
      return res.status(500).send({ message: 'Unknown error', success: false });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await this.findAllInvoiceService.execute();
      return res.status(200).send({
        message: 'Find All Invoices',
        data: result,
        success: true
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).send({
          message: error.message,
          success: false
        });
      }
      return res.status(401).send({
        message: 'Unknown error',
        success: false
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).send({
          message: 'ID params is required',
          success: false
        });
      }
      const result = await this.findByIdInvoiceService.execute(id);
      return res.status(200).send({
        message: 'Invoice is found',
        data: result,
        success: true
      })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).send({
          message: error.message,
          success: false
        });
      }
      return res.status(401).send({
        message: 'Unknown error',
        success: false
      });
    }
  }
}