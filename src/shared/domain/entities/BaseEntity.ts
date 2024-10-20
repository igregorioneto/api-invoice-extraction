import { v4 as uuidv4 } from 'uuid';
export class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(params: { id?: string; createdAt?: Date; updatedAt?: Date }) {
    this.id = params.id || uuidv4();;
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
  }
}