/*
  Warnings:

  - You are about to drop the column `networkTitle` on the `wifis` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,title]` on the table `wifis` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `wifis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wifis" DROP COLUMN "networkTitle",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "wifis_userId_title_key" ON "wifis"("userId", "title");
