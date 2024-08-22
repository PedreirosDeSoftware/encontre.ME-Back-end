/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `acitivation_account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "acitivation_account_user_id_key" ON "acitivation_account"("user_id");
