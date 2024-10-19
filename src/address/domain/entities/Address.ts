import { BaseEntity } from "../../../shared/domain/entities/BaseEntity";

export class Address extends BaseEntity {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  clientId: string;

  constructor(params: {
    id?: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    cep: string;
    clientId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    super({ id: params.id, createdAt: params.createdAt, updatedAt: params.updatedAt });
    this.street = params.street;
    this.number = params.number;
    this.district = params.district;
    this.city = params.city;
    this.state = params.state;
    this.cep = params.cep;
    this.clientId = params.clientId;
  }
}