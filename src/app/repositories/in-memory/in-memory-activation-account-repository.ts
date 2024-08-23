import { ActivationAccountRepository } from "@/app/interfaces/activation-account-interfaces";
import { Prisma, ActivationAccount } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryActivationAccount implements ActivationAccountRepository {
    public accounts: ActivationAccount[] = [];

    async create(data: Prisma.ActivationAccountUncheckedCreateInput) {
        const account = {
            id: randomUUID(),
            activation: data.activation ? new Date( data.activation ) : null,
            account_id: data.account_id
        }

        this.accounts.push(account);
        return account
    }

    async findByAccountId(accountId: string) {
        const account = this.accounts.find(item => item.account_id === accountId);
        if (!account) return null;

        return account;
    }

   async accountActivation(accountId: string) {

        const accountIndex = this.accounts.findIndex(item => item.account_id === accountId);
        if (accountIndex === -1) return null;       

        const activationAccount = this.accounts[accountIndex];
        activationAccount.activation = new Date();

        const account = this.accounts[accountIndex] = activationAccount;        
        return account
   }
}