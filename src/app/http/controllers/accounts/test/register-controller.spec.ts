import { app } from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe('Register e2e', () => {

    it('should be able to register', async () => {
        const response = await request(app)
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
            });

        expect(response.statusCode).toEqual(201);
        expect(response.body.account).toEqual(expect.any(String));
    });     
});