import {  beforeEach, describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/app/utils/create-and-authenticate-user";



describe('Fetch Posts e2e', async () => {

    const { id, token } = await createAndAuthenticateUser();  

    it('should be able to fetch posts', async () => {
           

        await request(app)
            .post(`/api/user/${id}/posts/create`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                fullName: "teste 1", 
	            description: "desaparecido a dias", 
	            contact: "55 61 9999-9999",
	            imagesUrl: "localhost/images/url"
            });

        await request(app)
            .post(`/api/user/${id}/posts/create`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                fullName: "teste 2", 
	            description: "desaparecido a dias", 
	            contact: "55 61 9999-9999",
	            imagesUrl: "localhost/images/url"
            });


        const response = await request(app)
            .get('/api/posts')
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.posts).toHaveLength(2)
    });

    it('should be able to search posts', async () => {
    
        await request(app)
            .post(`/api/user/${id}/posts/create`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                fullName: "lucas", 
	            description: "desaparecido a dias", 
	            contact: "55 61 9999-9999",
	            imagesUrl: "localhost/images/url"
            });

        await request(app)
            .post(`/api/user/${id}/posts/create`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                fullName: "joao", 
	            description: "desaparecido a dias", 
	            contact: "55 61 9999-9999",
	            imagesUrl: "localhost/images/url"
            });


        const response = await request(app)
            .get('/api/posts')
            .query({
                fullName: 'lucas'
            })
            .send();
        expect(response.statusCode).toEqual(200);
        expect(response.body.posts).toEqual([expect.objectContaining({ fullName: "lucas" })])
    });
});