import { describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/app/utils/create-and-authenticate-user";

describe('Search Posts e2e', () => {
    it('should be able to search posts',async () => {
        const { id, token } = await createAndAuthenticateUser();        

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
                query: 'joao'
            })
            .send();

        //console.log(response.body);
        

        expect(response.statusCode).toEqual(200);
        expect(response.body.posts).toHaveLength(1);
    })
});