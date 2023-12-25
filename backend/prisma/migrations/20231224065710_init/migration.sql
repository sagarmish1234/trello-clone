/*
  Warnings:

  - You are about to drop the column `create_date` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `signup_date` on the `User` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_owner_id_fkey";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "create_date",
DROP COLUMN "owner_id",
ADD COLUMN     "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "signup_date",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "signupDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "List" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
