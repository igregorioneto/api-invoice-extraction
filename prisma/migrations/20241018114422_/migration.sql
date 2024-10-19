-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "numberClient" TEXT NOT NULL,
    "monthReference" TIMESTAMP(3) NOT NULL,
    "eletricalEnergyQuantity" INTEGER NOT NULL,
    "eletricalEnergyAmount" DECIMAL(65,30) NOT NULL,
    "energySCEEEICMSQuantity" INTEGER NOT NULL,
    "energySCEEEICMSAmount" DECIMAL(65,30) NOT NULL,
    "compensatedEnergyQuantity" INTEGER NOT NULL,
    "compensatedEnergyAmount" DECIMAL(65,30) NOT NULL,
    "publicLightingContribution" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_id_key" ON "Invoice"("id");
