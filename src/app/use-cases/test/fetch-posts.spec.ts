import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryPostRepository } from "../../repositories/in-memory/in-memory-post-repository";
import { FetchPostsUseCase } from "../fetch-posts";
import { InMemoryEventRepository } from "../../repositories/in-memory/in-memory-event-repository";

let postRepository: InMemoryPostRepository;
let eventRepository: InMemoryEventRepository;
let sut: FetchPostsUseCase; 

describe('Fetch Posts Use Case', () => {

    beforeEach(() => {
        eventRepository = new InMemoryEventRepository;
        postRepository = new InMemoryPostRepository(eventRepository);
        sut = new FetchPostsUseCase(postRepository);

    });

    it('should be able to fetch posts', async () => { 
        for(let i = 1; i <= 20; i++) {
            await postRepository.create({
                fullName: `desaparecido ${i}`,
                description: 'é uma pessoa desaparecida',
                contact: '55 61 9999-9999',
                user_id: 'user-1',
                event_id: null
            });
        }

        const { posts } = await sut.execute({
            
        });

        expect(posts).toHaveLength(20);
    });

    it('should be able to search posts', async () => { 
        for(let i = 1; i <= 20; i++) {
            await postRepository.create({
                fullName: `desaparecido ${i}`,
                description: 'é uma pessoa desaparecida',
                contact: '55 61 9999-9999',
                user_id: 'user-1',
                event_id: null
            });
        }
            
        const { posts } = await sut.execute({
            fullName: 'desaparecido 20'
        });      
        
        expect(posts).toEqual([expect.objectContaining({ fullName: 'desaparecido 20' })]);
    });

    it('should be able to search posts from a event', async () => { 
        const event = await eventRepository.create({
            name: 'evento de teste',
            state: 'USA', 
            city: 'California',
            status: true
        })

        for(let i = 1; i <= 10; i++) {
            await postRepository.create({
                fullName: `desaparecido ${i}`,
                description: 'é uma pessoa desaparecida',
                contact: '55 61 9999-9999',
                user_id: 'user-id',
                event_id: event.id
            });
        }
        
        const { posts } = await sut.execute({
            event: true
        });        

        expect(posts).toHaveLength(10);
    });
});