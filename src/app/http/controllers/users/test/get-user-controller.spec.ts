import { describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/app/utils/create-and-authenticate-user";

describe('Get User e2e', () => {
    it('should be able to get user',async () => {
        const { id } = await createAndAuthenticateUser();

        const response = await request(app)
            .get(`/api/user/${id}`)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.user).toEqual(expect.objectContaining({ name: 'John Doe' }));
    })
});