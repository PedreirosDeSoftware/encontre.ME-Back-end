import { PrismaEventRepository } from "../repositories/prisma/prisma-event-repository";
import { CreateEventUseCase } from "../use-cases/create-event";

export function makeCreateWeatherEventUseCase() {
    const eventRepository = new PrismaEventRepository();
    const useCase = new CreateEventUseCase(eventRepository);
    return useCase;
}