import { BaseEntity } from "../../../shared/domain/entities/BaseEntity";

export class Invoice extends BaseEntity {
  monthReference: string;
  eletricalEnergyQuantity: string;
  eletricalEnergyAmount: string;
  energySCEEEICMSQuantity: string;
  energySCEEEICMSAmount: string;
  compensatedEnergyQuantity: string;
  compensatedEnergyAmount: string;
  publicLightingContribution: string;
  addressId: string;

  constructor(params: {
    id?: string;
    monthReference: string;
    eletricalEnergyQuantity: string;
    eletricalEnergyAmount: string;
    energySCEEEICMSQuantity: string;
    energySCEEEICMSAmount: string;
    compensatedEnergyQuantity: string;
    compensatedEnergyAmount: string;
    publicLightingContribution: string;
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