import { createAndAuthenticateAccount } from "@/app/utils/create-and-authenticate-account";
import { describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe('Delete Account e2e', () => {
    it('should be able to delete a account', async () => {
        const { id, token } = await createAndAuthenticateAccount();

        const response = await request(app)
            .delete(`/api/account/${id}/delete`)
            .set("Authorization", `Bearer ${token}`)
            .send();
        
        expect(response.statusCode).toEqual(204);
    });
})