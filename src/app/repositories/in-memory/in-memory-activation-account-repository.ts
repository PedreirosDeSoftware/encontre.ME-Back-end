import { ActivationAccountRepository } from "@/app/interfaces/activation-account-interfaces";
import { Prisma, ActivationAccount } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryActivationAccount implements ActivationAccountRepository {
    public accounts: ActivationAccount[] = [];

    async create(data: Prisma.ActivationAccountUncheckedCreateInput) {
        const account = {
            id: randomUUID(),
            activation: data.activation ? new Date( data.activation ) : null,
            user_id: data.user_id
        }

        this.accounts.push(account);
        return account
    }

    async findByUserId(userId: string) {
        const account = this.accounts.find(item => item.user_id === userId);
        if (!account) return null;

        return account;
    }

   async accountActivation(userId: string) {

        const accountIndex = this.accounts.findIndex(item => item.user_id === userId);
        if (accountIndex === -1) return null;       

        const activationAccount = this.accounts[accountIndex];
        activationAccount.activation = new Date();

        const account = this.accounts[accountIndex] = activationAccount;        
        return account
   }
}