/*
  Warnings:

  - Added the required column `code` to the `banks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "banks" ADD COLUMN     "code" INTEGER NOT NULL;
