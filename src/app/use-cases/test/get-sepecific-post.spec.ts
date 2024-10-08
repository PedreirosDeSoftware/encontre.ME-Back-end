import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryPostRepository } from "../../repositories/in-memory/in-memory-post-repository";
import { GetSpecificPostUseCase } from "../get-specific-post";
import { ResourceNotFound } from "../../exceptions/resource-not-found";
import { InMemoryEventRepository } from "../../repositories/in-memory/in-memory-event-repository";

let postRepository: InMemoryPostRepository;
let eventRepository: InMemoryEventRepository;
let sut: GetSpecificPostUseCase; 

describe('Get Specific Post Use Case', () => {

    beforeEach(() => {
        eventRepository = new InMemoryEventRepository;
        postRepository = new InMemoryPostRepository(eventRepository);
        sut = new GetSpecificPostUseCase(postRepository);

    });

    it('should be able to get specific post', async () => { 
         const postId = await postRepository.create({
                fullName: `desaparecido 1`,
                description: 'é uma pessoa desaparecida',
                contact: '55 61 9999-9999',
                account_id: 'account-1',
            });
            
        const { post } = await sut.execute({
            id: postId.id
        });
        
        expect(post).toEqual(expect.objectContaining({ fullName: 'desaparecido 1' }));
    });

    it('should not be able to get specific post', async () => { 
        for(let i = 1; i <= 20; i++) {
            await postRepository.create({
                fullName: `desaparecido ${i}`,
                description: 'é uma pessoa desaparecida',
                contact: '55 61 9999-9999',
                account_id: 'account-1',
            });
        }
                
      await expect(() =>
        sut.execute({
            id: 'no-existing'
            })
        ).rejects.toBeInstanceOf(ResourceNotFound);
    });
});