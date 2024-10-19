/*
  Warnings:

  - A unique constraint covering the columns `[createdBy]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdBy" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "users_createdBy_key" ON "users"("createdBy");
