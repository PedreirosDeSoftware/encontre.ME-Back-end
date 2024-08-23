-- CreateTable
CREATE TABLE "acitivation_account" (
    "id" TEXT NOT NULL,
    "activation" TIMESTAMP(3),
    "account_id" TEXT NOT NULL,

    CONSTRAINT "acitivation_account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "acitivation_account" ADD CONSTRAINT "acitivation_account_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
