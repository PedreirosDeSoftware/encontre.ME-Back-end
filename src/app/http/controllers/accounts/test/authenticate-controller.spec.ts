import { describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateAccount } from "@/app/utils/create-and-authenticate-account";

describe('Authenticate e2e', () => {
    it('should be able to authenticate', async () => {
        
        await createAndAuthenticateAccount();
        
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