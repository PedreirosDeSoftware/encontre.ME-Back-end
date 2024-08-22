import { ActivationAccount, Prisma } from "@prisma/client";

export interface ActivationAccountRepository {
    create(data: Prisma.ActivationAccountUncheckedCreateInput): Promise<ActivationAccount>;
    findByUserId(userId: string): Promise<ActivationAccount | null>
    accountActivation(userId: string): Promise<ActivationAccount | null>;
}