/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `wifis` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "wifis_userId_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "wifis_userId_key" ON "wifis"("userId");
