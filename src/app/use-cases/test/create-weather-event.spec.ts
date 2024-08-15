import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryWeatherEventRepository } from "../../repositories/in-memory/in-memory-weather-event-repository";
import { CreateWeatherEventUseCase } from "../create-weather-event";

let weatherEventRepository: InMemoryWeatherEventRepository;
let sut: CreateWeatherEventUseCase; 

describe('Create Weather Event Use Case', () => {

    beforeEach(() => {
        weatherEventRepository = new InMemoryWeatherEventRepository();
        sut = new CreateWeatherEventUseCase(weatherEventRepository);
    });

    it('should be able to create weather event', async () => { 
        const { event } = await sut.execute({
            name: 'terremoto',
            state: 'USA',
            city: 'California',
            status: true
        });
        
        expect(event.id).toEqual(expect.any(String));
    });
});