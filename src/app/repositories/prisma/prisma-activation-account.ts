import { ActivationAccountRepository } from "@/app/interfaces/activation-account-interfaces";
import { prisma } from "@/app/lib/prisma";
import { Prisma, ActivationAccount } from "@prisma/client";

export class PrismaActivationAccount implements ActivationAccountRepository {
    async create(data: Prisma.ActivationAccountUncheckedCreateInput) {
        const account = await prisma.activationAccount.create({
            data,
        });

        return account;
    }

    async findByUserId(userId: string) {
        const account = await prisma.activationAccount.findUnique({
            where: { user_id: userId }
        })

        return account;
    }

    async accountActivation(userId: string) {
        const account = await prisma.activationAccount.update({
            where: { 
                user_id: userId, 
            },
            data: {
                activation: new Date()
            },
        })

        return account;
    }
}