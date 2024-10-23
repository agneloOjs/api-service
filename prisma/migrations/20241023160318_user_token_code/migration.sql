-- CreateTable
CREATE TABLE "user_token_codes" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "tokenCode" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_token_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_token_codes_id_key" ON "user_token_codes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_token_codes_userId_key" ON "user_token_codes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_token_codes_tokenCode_key" ON "user_token_codes"("tokenCode");

-- CreateIndex
CREATE INDEX "user_token_codes_userId_tokenCode_idx" ON "user_token_codes"("userId", "tokenCode");

-- AddForeignKey
ALTER TABLE "user_token_codes" ADD CONSTRAINT "user_token_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
