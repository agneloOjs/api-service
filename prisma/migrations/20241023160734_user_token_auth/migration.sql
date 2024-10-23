-- CreateTable
CREATE TABLE "user_tokers" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "accessToken" UUID,
    "refreshToken" UUID,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "ipAddress" VARCHAR(45),
    "deviceId" VARCHAR(255),
    "deviceType" VARCHAR(50),

    CONSTRAINT "user_tokers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_tokers_id_key" ON "user_tokers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_tokers_userId_key" ON "user_tokers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_tokers_accessToken_key" ON "user_tokers"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "user_tokers_refreshToken_key" ON "user_tokers"("refreshToken");

-- AddForeignKey
ALTER TABLE "user_tokers" ADD CONSTRAINT "user_tokers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
