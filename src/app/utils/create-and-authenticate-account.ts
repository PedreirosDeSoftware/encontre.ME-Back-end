import { prisma } from "../lib/prisma";
import request from "supertest";
import { app } from "@/app";
import { hash } from "bcryptjs";

export async function createAndAuthenticateAccount() {
    const account = await prisma.account.create({
        data: {
            name: 'John Doe',
            authorName: "responsável",
            email: "admin@email.com",
            passwordHash: await hash('12345678', 6),
            cnpj_cpf: "12345678973",
            phone: "55 61 9999-9999",
            state: "Brazil",
            city: "São Paulo",
            cep: "12345678",
            address: "rua nada",
        }
    });

    await prisma.activationAccount.create({
        data: { 
            activation: new Date(),
            account_id: account.id,
        }
    });

    const response = await request(app)
        .post('/api/login')
        .send({
            email: "admin@email.com",
            password: "12345678"
        });

    const { id } = account;
    const { token } = response.body;
    return { id, token }
}