/*
  Warnings:

  - You are about to drop the column `user_id` on the `images` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_user_id_fkey";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "user_id";
