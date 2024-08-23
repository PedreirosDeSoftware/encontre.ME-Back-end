import { describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateAccount } from "@/app/utils/create-and-authenticate-account";

describe('Get Account e2e', () => {
    it('should be able to get account',async () => {
        const { id, token } = await createAndAuthenticateAccount();

        const response = await request(app)
            .get(`/api/account/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.account).toEqual(expect.objectContaining({ name: 'John Doe' }));
    });
});