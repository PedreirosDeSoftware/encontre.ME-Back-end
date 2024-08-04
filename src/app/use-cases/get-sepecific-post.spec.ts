import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryPostRepository } from "../repositories/in-memory/in-memory-post-repository";
import { GetSpecificPostUseCase } from "./get-specific-post";
import { ResourceNotFound } from "../exceptions/resource-not-found";
import { InMemoryWeatherEventRepository } from "../repositories/in-memory/in-memory-weather-event-repository";

let postRepository: InMemoryPostRepository;
let weatherEventRepository: InMemoryWeatherEventRepository;
let sut: GetSpecificPostUseCase; 

describe('Get Specific Post Use Case', () => {

    beforeEach(() => {
        weatherEventRepository = new InMemoryWeatherEventRepository;
        postRepository = new InMemoryPostRepository(weatherEventRepository);
        sut = new GetSpecificPostUseCase(postRepository);

    });

    it('should be able to get specific post', async () => { 
        for(let i = 1; i <= 20; i++) {
            await postRepository.create({
                fullName: `desaparecido ${i}`,
                description: 'é uma pessoa desaparecida',
                contact: '55 61 9999-9999',
                imagesUrl: '/local/images/upload',
                user_id: 'user-1',
                weather_event_id: 'no-existing',
            });
        }
        
        const { post } = await sut.execute({
            name: 'desaparecido 2'
        });
        
        expect(post).toEqual(expect.objectContaining({ fullName: 'desaparecido 2' }));
    });

    it('should not be able to get specific post', async () => { 
        for(let i = 1; i <= 20; i++) {
            await postRepository.create({
                fullName: `desaparecido ${i}`,
                description: 'é uma pessoa desaparecida',
                contact: '55 61 9999-9999',
                imagesUrl: '/local/images/upload',
                user_id: 'user-1',
                weather_event_id: 'no-existing'
            });
        }
                
      await expect(() =>
        sut.execute({
            name: 'desaparecido 22'
            })
        ).rejects.toBeInstanceOf(ResourceNotFound);
    });
});