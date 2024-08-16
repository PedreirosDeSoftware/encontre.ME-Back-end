import { describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/app/utils/create-and-authenticate-user";
import { prisma } from "@/app/lib/prisma";

describe('Fetch Posts e2e', async () => {

    it('should be able to fetch posts', async () => {

        const { id } = await createAndAuthenticateUser();
        
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
                user_id: id,
                event_id: event.id,
            }
        })

        await prisma.post.create({
            data: {
                fullName: 'joao',
                description: "desaparecido a dias", 
	            contact: "55 61 9999-9999",
                user_id: id
            }
        })
           
        const response = await request(app)
            .get('/api/posts')
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.posts).toHaveLength(2)
    });

    it('should be able to search posts', async () => {

        const response = await request(app)
            .get('/api/posts')
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
            .query({
                event: true
            })
            .send();
        expect(response.statusCode).toEqual(200);
        expect(response.body.posts).toEqual([expect.objectContaining({ fullName: "lucas" })])
    });
});