-- CreateTable
CREATE TABLE "Companys" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "email" VARCHAR(128),
    "corporateReason" VARCHAR(128),
    "fantasyName" VARCHAR(128),
    "cnpj" TEXT NOT NULL,
    "stateRegistration" TEXT,
    "municipalRegistration" TEXT,
    "taxationRegime" TEXT,
    "operatingLicense" TEXT,
    "licenseValidity" TIMESTAMP(3),
    "openingDate" TIMESTAMP(3),
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "cnae" TEXT,
    "fiscalResponsibleName" TEXT,
    "fiscalResponsibleCpf" TEXT,
    "hasDigitalCertificate" BOOLEAN,
    "regularizationProcessNumber" TEXT,
    "fiscalObservations" TEXT,
    "createdBy" TEXT,

    CONSTRAINT "Companys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Companys_id_key" ON "Companys"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Companys_email_key" ON "Companys"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Companys_corporateReason_key" ON "Companys"("corporateReason");

-- CreateIndex
CREATE UNIQUE INDEX "Companys_fantasyName_key" ON "Companys"("fantasyName");

-- CreateIndex
CREATE UNIQUE INDEX "Companys_cnpj_key" ON "Companys"("cnpj");

-- CreateIndex
CREATE INDEX "Companys_cnpj_email_idx" ON "Companys"("cnpj", "email");
