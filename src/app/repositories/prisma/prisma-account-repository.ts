import { AccountRepository } from "@/app/interfaces/account-interfaces";
import { prisma } from "@/app/lib/prisma";
import { Prisma, Account } from "@prisma/client";

export class PrismaAccountRepository implements AccountRepository {

    async create(data: Prisma.AccountCreateInput) {
        const account = await prisma.account.create({
            data
        });
        return account;
    }

    async findByEmail(email: string){
        const account = await prisma.account.findUnique({
            where: { email }
        });
        if (!account) return null;

        return account;
    }

    async findById(id: string) {
        const account = await prisma.account.findUnique({
            where: { id }
        });

        return account
    }
   

    async update(id: string, data: Prisma.AccountUncheckedUpdateInput) {
        const account = await prisma.account.update({
            where: { id },
            data: {
                ...data
            }
        });

        return account;
    }

    async delete(id: string){
        await prisma.account.delete({
            where: { id }
        });
    }
}