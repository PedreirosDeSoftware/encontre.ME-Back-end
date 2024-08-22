import { prisma } from "../lib/prisma";
import request from "supertest";
import { app } from "@/app";
import { hash } from "bcryptjs";

export async function createAndAuthenticateUser() {
    const user = await prisma.user.create({
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
            user_id: user.id,
        }
    });

    const response = await request(app)
        .post('/api/login')
        .send({
            email: "admin@email.com",
            password: "12345678"
        });

    const { id } = user;
    const { token } = response.body;
    return { id, token }
}