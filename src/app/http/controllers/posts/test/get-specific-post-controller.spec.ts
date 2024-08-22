import { describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/app/utils/create-and-authenticate-user";
import { prisma } from "@/app/lib/prisma";

describe('Get Specific Post e2e', () => {
    it('should be able to get specific post',async () => {
        const { id, token } = await createAndAuthenticateUser();        

        const post = await prisma.post.create({
            data: {
                fullName: 'teste',
                description: "desaparecido a dias", 
	            contact: "55 61 9999-9999",
                user_id: id
            }
        })

        const response = await request(app)
            .get(`/api/posts/${post.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();        

        expect(response.statusCode).toEqual(200);
        expect(response.body.post).toEqual(expect.objectContaining({ fullName: 'teste' }));
    })
});