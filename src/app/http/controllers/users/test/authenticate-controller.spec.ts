import { describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe('Authenticate e2e', () => {
    it('should be able to authenticate', async () => {
        await request(app)
            .post('/api/register')
            .send({
                name: "admin",
	            authorName: "responsável",
                email: "admin@email.com",
                password: "12345678",
                cnpj_cpf: "12345678973",
	            phone: "55 61 9999-9999",
                state: "Brazil",
                city: "São Paulo",
                cep: "12345678",
                address: "rua nada"
            })

        const response = await request(app)
            .post('/api/login')
            .send({
                email: "admin@email.com",
                password: '12345678'
            });

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ token: expect.any(String) });
    });
});