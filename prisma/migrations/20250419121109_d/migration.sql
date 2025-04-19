/*
  Warnings:

  - You are about to drop the column `levelId` on the `ProductTools` table. All the data in the column will be lost.
  - Added the required column `toolId` to the `ProductTools` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductTools" DROP CONSTRAINT "ProductTools_levelId_fkey";

-- AlterTable
ALTER TABLE "ProductTools" DROP COLUMN "levelId",
ADD COLUMN     "toolId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductTools" ADD CONSTRAINT "ProductTools_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
