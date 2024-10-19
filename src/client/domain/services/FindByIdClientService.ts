import pdf from "pdf-parse";
import { ClientRepository } from "../ports/ClientRepository";

export class FindByIdClientService {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute(id: string) {
    return await this.clientRepository.findById(id);
  }
}