/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "anotation" TEXT NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "securityCode" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wifi" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "netWordTitle" TEXT NOT NULL,
    "networkName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Wifi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notes_userId_key" ON "notes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "notes_userId_title_key" ON "notes"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Card_userId_key" ON "Card"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Wifi_userId_key" ON "Wifi"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_userId_key" ON "credentials"("userId");

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wifi" ADD CONSTRAINT "Wifi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
