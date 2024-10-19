import pdf from "pdf-parse";
import { ClientRepository } from "../ports/ClientRepository";
import { Client } from "../entities/Client";

export class CreateClientService {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute(client: Client) {
    await this.clientRepository.create(client);
  }
}