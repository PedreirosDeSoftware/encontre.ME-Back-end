/*
  Warnings:

  - A unique constraint covering the columns `[account_id]` on the table `acitivation_account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "acitivation_account_account_id_key" ON "acitivation_account"("account_id");
