/*
  Warnings:

  - You are about to drop the `Finances` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Finances" DROP CONSTRAINT "Finances_userId_fkey";

-- DropTable
DROP TABLE "Finances";

-- CreateTable
CREATE TABLE "finances" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "Month" TEXT NOT NULL,
    "Year" TEXT NOT NULL,

    CONSTRAINT "finances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "money_inlets" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "importance" TEXT NOT NULL,
    "recurrence" TEXT NOT NULL,
    "financesId" TEXT,

    CONSTRAINT "money_inlets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "money_out" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "importance" TEXT NOT NULL,
    "recurrence" TEXT NOT NULL,
    "financesId" TEXT,

    CONSTRAINT "money_out_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "balance" TEXT NOT NULL,
    "moneyOutId" TEXT,
    "moneyInletsId" TEXT,
    "userId" TEXT,

    CONSTRAINT "banks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "money" TEXT NOT NULL,
    "moneyOutId" TEXT,
    "userId" TEXT,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "finances" ADD CONSTRAINT "finances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "money_inlets" ADD CONSTRAINT "money_inlets_financesId_fkey" FOREIGN KEY ("financesId") REFERENCES "finances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "money_out" ADD CONSTRAINT "money_out_financesId_fkey" FOREIGN KEY ("financesId") REFERENCES "finances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banks" ADD CONSTRAINT "banks_moneyInletsId_fkey" FOREIGN KEY ("moneyInletsId") REFERENCES "money_inlets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banks" ADD CONSTRAINT "banks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banks" ADD CONSTRAINT "banks_moneyOutId_fkey" FOREIGN KEY ("moneyOutId") REFERENCES "money_out"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_moneyOutId_fkey" FOREIGN KEY ("moneyOutId") REFERENCES "money_out"("id") ON DELETE SET NULL ON UPDATE CASCADE;
