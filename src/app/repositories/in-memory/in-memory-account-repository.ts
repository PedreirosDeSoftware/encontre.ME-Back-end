import { AccountRepository } from "@/app/interfaces/account-interfaces";
import { Prisma, Account } from "@prisma/client";
import { randomUUID } from "node:crypto";
export class InMemoryAccountRepository implements AccountRepository {
    public accounts: Account[] = [];

    async create(data: Prisma.AccountCreateInput) {
        const account = {
            id: randomUUID(),
            name: data.name,
            authorName: data.authorName ?? null,
            email: data.email,
            passwordHash: data.passwordHash,
            cnpj_cpf: data.cnpj_cpf,
            phone: data.phone,
            state: data.state,
            city: data.city,
            cep: data.cep,
            address: data.address,
            avatarImage: data.avatarImage ?? null,
            createdAt: new Date()
        }

        this.accounts.push(account);
        return account;
    }

    async findByEmail(email: string){
        const account = this.accounts.find(item => item.email === email);
        if (!account) return null;

        return account;
    }

    async findById(id: string) {
        const account = this.accounts.find(item => item.id === id);     
        if (!account) return null;

        return account;
    }

    async update(id: string, data: Prisma.AccountUncheckedUpdateInput) {
        const accountIndex = this.accounts.findIndex(item => item.id === id); 
        if (accountIndex > -1) {
            const updateAccount: Account = {
                id: data.id as string || this.accounts[accountIndex].id,
                name: data.name as string || this.accounts[accountIndex].name,
                authorName: data.authorName as string || this.accounts[accountIndex].authorName,
                email: data.email as string || this.accounts[accountIndex].email,
                passwordHash: data.passwordHash as string || this.accounts[accountIndex].passwordHash,
                cnpj_cpf: data.cnpj_cpf as string || this.accounts[accountIndex].cnpj_cpf,
                phone: data.phone as string || this.accounts[accountIndex].phone,
                state: data.state as string || this.accounts[accountIndex].state,
                city: data.city as string || this.accounts[accountIndex].city,
                cep: data.cep as string || this.accounts[accountIndex].cep,
                address: data.address as string || this.accounts[accountIndex].address,
                avatarImage: data.avatarImage as string || this.accounts[accountIndex].avatarImage,
                createdAt: data.createdAt as Date || this.accounts[accountIndex].createdAt
            }  
             
            const account = this.accounts[accountIndex] = updateAccount;
            return account;
        } 
        return null;        
    }

    async delete(id: string) {
        const accountIndex = this.accounts.findIndex(item => item.id === id);
        if (accountIndex > -1) {
            this.accounts.splice(accountIndex, 1);
        }
    }
}