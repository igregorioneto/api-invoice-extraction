import { BaseEntity } from "../../../shared/domain/entities/BaseEntity";

export class Invoice extends BaseEntity {
  monthReference: string;
  eletricalEnergyQuantity: number;
  eletricalEnergyAmount: number;
  energySCEEEICMSQuantity: number;
  energySCEEEICMSAmount: number;
  compensatedEnergyQuantity: number;
  compensatedEnergyAmount: number;
  publicLightingContribution: number;
  addressId: string;

  constructor(params: {
    id?: string;
    monthReference: string;
    eletricalEnergyQuantity: number;
    eletricalEnergyAmount: number;
    energySCEEEICMSQuantity: number;
    energySCEEEICMSAmount: number;
    compensatedEnergyQuantity: number;
    compensatedEnergyAmount: number;
    publicLightingContribution: number;
    addressId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    super({ id: params.id, createdAt: params.createdAt, updatedAt: params.updatedAt });
    this.monthReference = params.monthReference;
    this.eletricalEnergyQuantity = params.eletricalEnergyQuantity;
    this.eletricalEnergyAmount = params.eletricalEnergyAmount;
    this.energySCEEEICMSQuantity = params.energySCEEEICMSQuantity;
    this.energySCEEEICMSAmount = params.energySCEEEICMSAmount;
    this.compensatedEnergyQuantity = params.compensatedEnergyQuantity;
    this.compensatedEnergyAmount = params.compensatedEnergyAmount;
    this.publicLightingContribution = params.publicLightingContribution;
    this.addressId = params.addressId;
  }
}