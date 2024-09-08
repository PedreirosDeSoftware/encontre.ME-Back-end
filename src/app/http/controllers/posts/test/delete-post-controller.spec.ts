import { createAndAuthenticateAccount } from "@/app/utils/create-and-authenticate-account";
import { describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { prisma } from "@/app/lib/prisma";

describe('Delete Post e2e', () => {
    it('should be able to delete a post', async () => {
        const { id, token } = await createAndAuthenticateAccount();

        const post = await prisma.post.create({
            data: {
                fullName: 'teste',
                description: "desaparecido a dias", 
	            contact: "55 61 9999-9999",
                account_id: id
            }
        });

        const response = await request(app)
            .delete(`/api/posts/${post.id}/delete`)
            .set("Authorization", `Bearer ${token}`)
            .send();
        
        expect(response.statusCode).toEqual(204);
    });
})