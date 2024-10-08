import { describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateAccount } from "@/app/utils/create-and-authenticate-account";

describe('Create Post e2e', () => {

    it.skip('should not be able to create post without images',async () => {
        const { id, token } = await createAndAuthenticateAccount();        

        const response = await request(app)
            .post(`/api/account/${id}/posts/create`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                fullName: "joao teste", 
	            description: "desaparecido a dias", 
	            contact: "55 61 9999-9999",
            });
        
        expect(response.statusCode).toEqual(201);
    });

    it('should not be able to create post without images',async () => {
        const { id, token } = await createAndAuthenticateAccount();        

        const response = await request(app)
            .post(`/api/account/${id}/posts/create`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                fullName: "joao teste", 
	            description: "desaparecido a dias", 
	            contact: "55 61 9999-9999",
            });
        
        expect(response.body).toEqual(expect.objectContaining({ message: 'Invalid Request' }));
    });
});