import { describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateAccount } from "@/app/utils/create-and-authenticate-account";
import { prisma } from "@/app/lib/prisma";

describe('Update Found Post e2e', () => {
    it('should be able to mark a post as found',async () => {
        const { id, token } = await createAndAuthenticateAccount();        

        const post = await prisma.post.create({
            data: {
                fullName: 'teste',
                description: "desaparecido a dias", 
	            contact: "55 61 9999-9999",
                account_id: id
            }
        })

        const response = await request(app)
            .patch(`/api/posts/${post.id}/found`)
            .set("Authorization", `Bearer ${token}`)
            .send();        

        expect(response.statusCode).toEqual(200);
        expect(response.body.post).toEqual(expect.objectContaining({ found: expect.any(String) }));
    })
});