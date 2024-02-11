/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `banks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "banks_code_key" ON "banks"("code");
