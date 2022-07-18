/*
  Warnings:

  - You are about to drop the column `netWordTitle` on the `wifis` table. All the data in the column will be lost.
  - Added the required column `networkTitle` to the `wifis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wifis" DROP COLUMN "netWordTitle",
ADD COLUMN     "networkTitle" TEXT NOT NULL;
