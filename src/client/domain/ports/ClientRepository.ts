import { Client } from "../entities/Client";

export interface ClientRepository {
  create(client: Client): Promise<Client | null>;
  findById(id: string): Promise<Client | null>;
  findByNumberClient(numberClient: string): Promise<Client | null>;
}