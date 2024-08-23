/*
  Warnings:

  - You are about to drop the column `imagesUrl` on the `accounts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_account_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "imagesUrl",
ADD COLUMN     "avatar_image" TEXT;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
