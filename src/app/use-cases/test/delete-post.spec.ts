import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryPostRepository } from "@/app/repositories/in-memory/in-memory-post-repository";
import { DeletePostUseCase } from "../delete-post";
import { InMemoryEventRepository } from "@/app/repositories/in-memory/in-memory-event-repository";

let postRepository: InMemoryPostRepository;
let eventRepository: InMemoryEventRepository;
let sut: DeletePostUseCase; 

describe('Delete Account Use Case', () => {

    beforeEach(() => {
        postRepository = new InMemoryPostRepository(eventRepository);
        sut = new DeletePostUseCase(postRepository);
    });

    it('should be able to delete account', async () => { 
        const post = await postRepository.create({
            fullName: `desaparecido 1`,
            description: 'é uma pessoa desaparecida',
            contact: '55 61 9999-9999',
            account_id: 'account-1',
        });

        await sut.execute(post.id);

        expect(postRepository.posts).toHaveLength(0);
    });
});