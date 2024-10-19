import { Client } from "../entities/Client";

export interface ClientRepository {
  create(client: Client): Promise<void>;
  findById(id: string): Promise<Client | null>;
}