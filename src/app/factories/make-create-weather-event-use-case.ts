import { PrismaWeatherEventRepository } from "../repositories/prisma/prisma-weather-event-repository";
import { CreateWeatherEventUseCase } from "../use-cases/create-weather-event";

export function makeCreateWeatherEventUseCase() {
    const weatherEventRepository = new PrismaWeatherEventRepository();
    const useCase = new CreateWeatherEventUseCase(weatherEventRepository);
    return useCase;
}