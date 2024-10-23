-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "phoneNumber" VARCHAR(15) NOT NULL,
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
    "createdBy" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "users_code_key" ON "users"("code");

-- CreateIndex
CREATE UNIQUE INDEX "users_createdBy_key" ON "users"("createdBy");

-- CreateIndex
CREATE INDEX "users_email_code_phoneNumber_idx" ON "users"("email", "code", "phoneNumber");
