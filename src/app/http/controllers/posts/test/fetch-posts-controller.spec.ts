import { beforeEach, describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateAccount } from "@/app/utils/create-and-authenticate-account";
import { prisma } from "@/app/lib/prisma";

describe('Fetch Posts e2e', async () => {
    
    const { id, token } = await createAndAuthenticateAccount();
  
    it('should be able to fetch posts', async () => {

        
        
        const event = await prisma.event.create({
            data: {
                name: 'event test',
                city: 'city test',
                state: 'state test',
                status: true

            }
        })
    
        await prisma.post.create({
            data: {
                fullName: 'lucas',
                description: "desaparecido a dias", 
	            contact: "55 61 9999-9999",
                account_id: id,
                event_id: event.id,
            }
        })

        await prisma.post.create({
            data: {
                fullName: 'joao',
                description: "desaparecido a dias", 
	            contact: "55 61 9999-9999",
                account_id: id
            }
        })
           
        const response = await request(app)
            .get('/api/posts')
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.posts).toHaveLength(2)
    });

    it('should be able to search posts', async () => {

        const response = await request(app)
            .get('/api/posts')
            .set("Authorization", `Bearer ${token}`)
            .query({
                name: 'lucas'
            })
            .send();
        expect(response.statusCode).toEqual(200);
        expect(response.body.posts).toEqual([expect.objectContaining({ fullName: "lucas" })])
    });

    it('should be able to search posts from a event', async () => {

        const response = await request(app)
            .get('/api/posts')
            .set("Authorization", `Bearer ${token}`)
            .query({
                event: true
            })
            .send();
        expect(response.statusCode).toEqual(200);
        expect(response.body.posts).toEqual([expect.objectContaining({ fullName: "lucas" })])
    });
});