/*
  Warnings:

  - The primary key for the `Board` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ChecklistItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `List` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `listId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "ChecklistItem" DROP CONSTRAINT "ChecklistItem_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_boardId_fkey";

-- DropForeignKey
ALTER TABLE "_CardToUser" DROP CONSTRAINT "_CardToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardToUser" DROP CONSTRAINT "_CardToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_member_relation" DROP CONSTRAINT "_member_relation_A_fkey";

-- DropForeignKey
ALTER TABLE "_member_relation" DROP CONSTRAINT "_member_relation_B_fkey";

-- AlterTable
ALTER TABLE "Board" DROP CONSTRAINT "Board_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "ownerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Board_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Board_id_seq";

-- AlterTable
ALTER TABLE "Card" DROP CONSTRAINT "Card_pkey",
ADD COLUMN     "listId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "position" SET DATA TYPE TEXT,
ADD CONSTRAINT "Card_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Card_id_seq";

-- AlterTable
ALTER TABLE "ChecklistItem" DROP CONSTRAINT "ChecklistItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "position" SET DATA TYPE TEXT,
ALTER COLUMN "cardId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ChecklistItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ChecklistItem_id_seq";

-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "cardId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Comment_id_seq";

-- AlterTable
ALTER TABLE "List" DROP CONSTRAINT "List_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "position" SET DATA TYPE TEXT,
ALTER COLUMN "boardId" SET DATA TYPE TEXT,
ADD CONSTRAINT "List_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "List_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "boardIds" SET DATA TYPE TEXT[],
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "_CardToUser" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_member_relation" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_member_relation" ADD CONSTRAINT "_member_relation_A_fkey" FOREIGN KEY ("A") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_member_relation" ADD CONSTRAINT "_member_relation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToUser" ADD CONSTRAINT "_CardToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToUser" ADD CONSTRAINT "_CardToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
