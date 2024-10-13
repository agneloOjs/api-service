-- AlterTable
ALTER TABLE "Companies" ADD COLUMN     "ownerId" UUID,
ADD COLUMN     "userId" UUID;

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "userName" VARCHAR(80) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "code" INTEGER NOT NULL,
    "password" VARCHAR(255),
    "resetPasswordToken" VARCHAR(255),
    "resetPasswordSentAt" TIMESTAMP(3),
    "rememberCreateAt" TIMESTAMP(3),
    "lastPasswordUpdate" TIMESTAMP(6),
    "passwordExpiration" TIMESTAMP(6),
    "failedLoginAttempts" INTEGER DEFAULT 0,
    "lockoutTime" TIMESTAMP(3),
    "companyId" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_code_key" ON "users"("code");

-- CreateIndex
CREATE INDEX "users_email_code_idx" ON "users"("email", "code");

-- AddForeignKey
ALTER TABLE "Companies" ADD CONSTRAINT "Companies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
