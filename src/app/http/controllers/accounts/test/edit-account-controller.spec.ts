import { createAndAuthenticateAccount } from "@/app/utils/create-and-authenticate-account";
import { describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe('Edit Account e2e', () => {
    it('should be able to edit a account', async () => {
        const { id, token } = await createAndAuthenticateAccount();

        const response = await request(app)
            .put(`/api/account/${id}/edit`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "John Doe 2",
            });
        
        expect(response.statusCode).toEqual(204);
    });
})