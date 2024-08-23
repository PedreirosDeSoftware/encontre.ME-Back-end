/*
  Warnings:

  - You are about to drop the column `account_id` on the `images` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_account_id_fkey";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "account_id";
