/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wifi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wifi" DROP CONSTRAINT "Wifi_userId_fkey";

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "Wifi";

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "securityCode" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wifis" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "netWordTitle" TEXT NOT NULL,
    "networkName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "wifis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cards_userId_key" ON "cards"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "cards_userId_name_key" ON "cards"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "wifis_userId_key" ON "wifis"("userId");

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wifis" ADD CONSTRAINT "wifis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
