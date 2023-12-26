/*
  Warnings:

  - Changed the type of `position` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `position` on the `ChecklistItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `position` on the `List` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "position",
ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ChecklistItem" DROP COLUMN "position",
ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "List" DROP COLUMN "position",
ADD COLUMN     "position" INTEGER NOT NULL;
