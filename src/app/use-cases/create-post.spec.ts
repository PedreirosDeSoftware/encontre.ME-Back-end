import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryPostRepository } from "../repositories/in-memory/in-memory-post-repository";
import { CreatePostUseCase } from "./create-post";
import { PostAlreadyExistsError } from "../exceptions/post-already-exist-error";
import { InMemoryWeatherEventRepository } from "../repositories/in-memory/in-memory-weather-event-repository";

let postRepository: InMemoryPostRepository;
let weatherEventRepository: InMemoryWeatherEventRepository;
let sut: CreatePostUseCase; 

describe('Create Post Use Case', () => {

    beforeEach(() => {
        weatherEventRepository = new InMemoryWeatherEventRepository;
        postRepository = new InMemoryPostRepository(weatherEventRepository);
        sut = new CreatePostUseCase(postRepository);

    });

    it('should be able to create post', async () => { 
        const { post } = await sut.execute({
            fullName: 'desaparecido',
            description: 'é uma pessoa desaparecida',
            contact: '55 61 9999-9999',
            imagesUrl: '/local/images/upload',
            user_id: 'user-1',
        });
        
        expect(post.id).toEqual(expect.any(String));
    });

    it('should not be able to create post with same full name', async () => { 
        await sut.execute({
            fullName: 'desaparecido',
            description: 'é uma pessoa desaparecida',
            contact: '55 61 9999-9999',
            imagesUrl: '/local/images/upload',
            user_id: 'user-1',
        });
        
        await expect(() => 
            sut.execute({
                fullName: 'desaparecido',
                description: 'é uma pessoa desaparecida',
                contact: '55 61 9999-9999',
                imagesUrl: '/local/images/upload',
                user_id: 'user-1',
            })
        ).rejects.toBeInstanceOf(PostAlreadyExistsError);
    });
});