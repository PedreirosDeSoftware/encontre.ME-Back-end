import { EventRepository, EventUseCaseRequest, EventUseCaseResponse } from "../interfaces/events-interfaces";

export class CreateEventUseCase {
    constructor(private eventRepository: EventRepository) {}

    async execute({ name, state, city, status }: EventUseCaseRequest): Promise<EventUseCaseResponse> {
        const event = await this.eventRepository.create({
            name, state, city, status
        });

        return { event }
    }
}