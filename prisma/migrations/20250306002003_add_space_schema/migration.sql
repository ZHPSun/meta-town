/*
  Warnings:

  - You are about to drop the `_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_users" DROP CONSTRAINT "_users_A_fkey";

-- DropForeignKey
ALTER TABLE "_users" DROP CONSTRAINT "_users_B_fkey";

-- DropTable
DROP TABLE "_users";

-- CreateTable
CREATE TABLE "_users_joined_spaces" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_users_joined_spaces_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_users_joined_spaces_B_index" ON "_users_joined_spaces"("B");

-- AddForeignKey
ALTER TABLE "_users_joined_spaces" ADD CONSTRAINT "_users_joined_spaces_A_fkey" FOREIGN KEY ("A") REFERENCES "spaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_joined_spaces" ADD CONSTRAINT "_users_joined_spaces_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
