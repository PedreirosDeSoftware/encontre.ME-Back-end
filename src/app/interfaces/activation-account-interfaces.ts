import { ActivationAccount, Prisma } from "@prisma/client";

export interface ActivationAccountRepository {
    create(data: Prisma.ActivationAccountUncheckedCreateInput): Promise<ActivationAccount>;
    findByAccountId(accountId: string): Promise<ActivationAccount | null>
    accountActivation(accountId: string): Promise<ActivationAccount | null>;
}