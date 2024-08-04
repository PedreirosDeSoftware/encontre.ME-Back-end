import { UserRepository } from "@/app/interfaces/user-interfaces";
import {  Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements UserRepository {
    public users: User[] = [];

    async create(data: Prisma.UserCreateInput) {
        const user = {
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
            createdAt: new Date()
        }

        this.users.push(user);
        return user;
    }

    async findByEmail(email: string){
        const user = this.users.find(item => item.email === email);
        if (!user) return null;

        return user;
    }

    async findById(id: string) {
        const user = this.users.find(item => item.id === id);     
        if (!user) return null;

        return user;
    }
}