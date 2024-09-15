/*
  Warnings:

  - You are about to drop the column `descripition` on the `Plate` table. All the data in the column will be lost.
  - You are about to drop the column `adress` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `description` to the `Plate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plate" DROP COLUMN "descripition",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT NOT NULL;
