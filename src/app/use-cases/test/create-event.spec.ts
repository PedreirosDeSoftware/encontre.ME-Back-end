import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryEventRepository } from "../../repositories/in-memory/in-memory-event-repository";
import { CreateEventUseCase } from "../create-event";

let eventRepository: InMemoryEventRepository;
let sut: CreateEventUseCase; 

describe('Create Weather Event Use Case', () => {

    beforeEach(() => {
        eventRepository = new InMemoryEventRepository();
        sut = new CreateEventUseCase(eventRepository);
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