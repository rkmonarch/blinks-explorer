/*
  Warnings:

  - The `blink_id` column on the `Tags` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[address]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "blink_id",
ADD COLUMN     "blink_id" UUID NOT NULL DEFAULT gen_random_uuid();

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- AddForeignKey
ALTER TABLE "Blink" ADD CONSTRAINT "Blink_address_fkey" FOREIGN KEY ("address") REFERENCES "User"("address") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_blink_id_fkey" FOREIGN KEY ("blink_id") REFERENCES "Blink"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
