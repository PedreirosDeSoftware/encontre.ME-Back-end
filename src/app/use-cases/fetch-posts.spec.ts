import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryPostRepository } from "../repositories/in-memory/in-memory-post-repository";
import { FetchPostsUseCase } from "./fetch-posts";
import { InMemoryWeatherEventRepository } from "../repositories/in-memory/in-memory-weather-event-repository";

let postRepository: InMemoryPostRepository;
let weatherEventRepository: InMemoryWeatherEventRepository;
let sut: FetchPostsUseCase; 

describe('Fetch Posts Use Case', () => {

    beforeEach(() => {
        weatherEventRepository = new InMemoryWeatherEventRepository;
        postRepository = new InMemoryPostRepository(weatherEventRepository);
        sut = new FetchPostsUseCase(postRepository);

    });

    it('should be able to fetch posts', async () => { 
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

        const { posts } = await sut.execute({
            
        });

        expect(posts).toHaveLength(20);
    });

    it('should be able to search posts from a weather event', async () => { 
        const event = await weatherEventRepository.create({
            name: 'evento de teste',
            state: 'USA', 
            city: 'California',
            status: true
        })

        for(let i = 1; i <= 20; i++) {
            await postRepository.create({
                fullName: `desaparecido ${i}`,
                description: 'é uma pessoa desaparecida',
                contact: '55 61 9999-9999',
                imagesUrl: '/local/images/upload',
                user_id: 'no-existing',
                weather_event_id: event.id
            });
        }
        
        const { posts } = await sut.execute({
            event: event.status
        });

        expect(posts).toHaveLength(20);
    });
});