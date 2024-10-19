import { BaseEntity } from "../../../shared/domain/entities/BaseEntity";

export class Client extends BaseEntity {
  name: string;
  document: string;
  numberClient: string;

  constructor(params: {
    id?: string;
    name: string;
    document: string;
    numberClient: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    super({ id: params.id, createdAt: params.createdAt, updatedAt: params.updatedAt });
    this.name = params.name;
    this.document = params.document;
    this.numberClient = params.numberClient;
  }
}