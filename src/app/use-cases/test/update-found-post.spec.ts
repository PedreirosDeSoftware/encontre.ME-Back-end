import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryPostRepository } from "../../repositories/in-memory/in-memory-post-repository";
import { ResourceNotFound } from "../../exceptions/resource-not-found";
import { InMemoryEventRepository } from "../../repositories/in-memory/in-memory-event-repository";
import { UpdateFoundPostUseCase } from "../update-found-post";

let postRepository: InMemoryPostRepository;
let eventRepository: InMemoryEventRepository;
let sut: UpdateFoundPostUseCase; 

describe('Update Found Post Use Case', () => {

    beforeEach(() => {
        eventRepository = new InMemoryEventRepository;
        postRepository = new InMemoryPostRepository(eventRepository);
        sut = new UpdateFoundPostUseCase(postRepository);

    });

    it('should be able to mark a post as found', async () => { 
         const postId = await postRepository.create({
                fullName: `desaparecido 1`,
                description: 'é uma pessoa desaparecida',
                contact: '55 61 9999-9999',
                account_id: 'account-1',
            });
            
        const { post } = await sut.execute({
            id: postId.id
        });
        
        expect(post.found).toEqual(expect.any(Date));
    });

    it('should not be able to mark a post as found', async () => { 
    
            await postRepository.create({
                fullName: `desaparecido`,
                description: 'é uma pessoa desaparecida',
                contact: '55 61 9999-9999',
                account_id: 'account-1',
            });
          
      await expect(() =>
        sut.execute({
            id: 'no-existing'
            })
        ).rejects.toBeInstanceOf(ResourceNotFound);
    });
});