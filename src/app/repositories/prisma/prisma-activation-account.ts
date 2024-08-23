import { ActivationAccountRepository } from "@/app/interfaces/activation-account-interfaces";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaActivationAccount implements ActivationAccountRepository {
    async create(data: Prisma.ActivationAccountUncheckedCreateInput) {
        const account = await prisma.activationAccount.create({
            data,
        });

        return account;
    }

    async findByAccountId(accountId: string) {
        const account = await prisma.activationAccount.findUnique({
            where: { account_id: accountId }
        })

        return account;
    }

    async accountActivation(accountId: string) {
        const account = await prisma.activationAccount.update({
            where: { 
                account_id: accountId, 
            },
            data: {
                activation: new Date()
            },
        })

        return account;
    }
}