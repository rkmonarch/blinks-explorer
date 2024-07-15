/*
  Warnings:

  - Added the required column `rank` to the `Blink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blink" ADD COLUMN     "rank" INTEGER NOT NULL;
