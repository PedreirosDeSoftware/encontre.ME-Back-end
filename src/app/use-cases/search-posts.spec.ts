import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryPostRepository } from "../repositories/in-memory/in-memory-post-repository";
import { InMemoryWeatherEventRepository } from "../repositories/in-memory/in-memory-weather-event-repository";
import { SearchPostUseCase } from "./search-post";

let postRepository: InMemoryPostRepository;
let weatherEventRepository: InMemoryWeatherEventRepository;
let sut: SearchPostUseCase; 

describe('Search Post Use Case', () => {

    beforeEach(() => {
        weatherEventRepository = new InMemoryWeatherEventRepository;
        postRepository = new InMemoryPostRepository(weatherEventRepository);
        sut = new SearchPostUseCase(postRepository);

    });

    it('should be able to search posts', async () => { 
        for(let i = 1; i <= 20; i++) {
            await postRepository.create({
                fullName: `desaparecido ${i}`,
                description: 'é uma pessoa desaparecida',
                contact: '55 61 9999-9999',
                imagesUrl: '/local/images/upload',
                user_id: 'user-1',
            });
        }
            
        const { posts } = await sut.execute({
            query: 'desaparecido 1'
        });
        
        expect(posts).toEqual([expect.objectContaining({ fullName: 'desaparecido 1' })]);
    });
});