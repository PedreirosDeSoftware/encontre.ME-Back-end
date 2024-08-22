-- CreateTable
CREATE TABLE "acitivation_account" (
    "id" TEXT NOT NULL,
    "activation" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "acitivation_account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "acitivation_account" ADD CONSTRAINT "acitivation_account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
