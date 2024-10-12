-- CreateTable
CREATE TABLE "Companies" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "email" VARCHAR(128),
    "corporateReason" VARCHAR(128),
    "fantasyName" VARCHAR(128),
    "cnpj" VARCHAR(18) NOT NULL,
    "stateRegistration" VARCHAR(9),
    "municipalRegistration" VARCHAR(14),
    "nire" VARCHAR(11),
    "taxationRegime" VARCHAR(80),
    "operatingLicense" VARCHAR(255),
    "licenseValidity" TIMESTAMP(3),
    "openingDate" TIMESTAMP(3),
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "mainCnae" VARCHAR(7),
    "secondaryCnae" VARCHAR(7),
    "fiscalResponsibleName" VARCHAR(80),
    "fiscalResponsibleCpf" VARCHAR(14),
    "fiscalResponsibleRne" VARCHAR(10),
    "hasDigitalCertificate" BOOLEAN,
    "digitalCertificate" VARCHAR(255),
    "validatedDigitalCertificate" TIMESTAMP(3),
    "regularizationProcessNumber" VARCHAR(28),
    "fiscalObservations" TEXT,
    "createdBy" VARCHAR(128),

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Companies_id_key" ON "Companies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_email_key" ON "Companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_corporateReason_key" ON "Companies"("corporateReason");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_fantasyName_key" ON "Companies"("fantasyName");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_cnpj_key" ON "Companies"("cnpj");

-- CreateIndex
CREATE INDEX "Companies_cnpj_email_idx" ON "Companies"("cnpj", "email");
