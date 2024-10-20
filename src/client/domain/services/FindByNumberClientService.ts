import pdf from "pdf-parse";
import { ClientRepository } from "../ports/ClientRepository";

export class FindByNumberClientService {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute(clientName: string) {
    return await this.clientRepository.findByNumberClient(clientName);
  }
}