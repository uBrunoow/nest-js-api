/*
  Warnings:

  - You are about to drop the `banks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "banks" DROP CONSTRAINT "banks_moneyInletsId_fkey";

-- DropForeignKey
ALTER TABLE "banks" DROP CONSTRAINT "banks_moneyOutId_fkey";

-- DropForeignKey
ALTER TABLE "banks" DROP CONSTRAINT "banks_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "avatarUrl" TEXT;

-- DropTable
DROP TABLE "banks";
