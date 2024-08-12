import { describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/app/utils/create-and-authenticate-user";

describe('Create Post e2e', () => {
    it('should be able to create post',async () => {
        const { id, token } = await createAndAuthenticateUser();        

        const response = await request(app)
            .post(`/api/user/${id}/posts/create`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                fullName: "joao teste", 
	            description: "desaparecido a dias", 
	            contact: "55 61 9999-9999",
	            imagesUrl: "localhost/images/url"
            });

        expect(response.statusCode).toEqual(201);
    })
});