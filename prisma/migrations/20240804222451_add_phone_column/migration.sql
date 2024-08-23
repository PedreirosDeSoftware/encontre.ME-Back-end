/*
  Warnings:

  - Added the required column `phone` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "phone" TEXT NOT NULL;
