/*
  Warnings:

  - You are about to drop the column `masterId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `star` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_masterId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "masterId",
DROP COLUMN "star",
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MasterRatings" (
    "id" TEXT NOT NULL,
    "star" DOUBLE PRECISION NOT NULL,
    "masterId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "MasterRatings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterRatings" ADD CONSTRAINT "MasterRatings_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterRatings" ADD CONSTRAINT "MasterRatings_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
