/*
  Warnings:

  - You are about to drop the `acitivation_account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "acitivation_account" DROP CONSTRAINT "acitivation_account_account_id_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "found" TIMESTAMP(3);

-- DropTable
DROP TABLE "acitivation_account";

-- CreateTable
CREATE TABLE "acitivation_accounts" (
    "id" TEXT NOT NULL,
    "activation" TIMESTAMP(3),
    "account_id" TEXT NOT NULL,

    CONSTRAINT "acitivation_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "acitivation_accounts_account_id_key" ON "acitivation_accounts"("account_id");

-- AddForeignKey
ALTER TABLE "acitivation_accounts" ADD CONSTRAINT "acitivation_accounts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
