import { CreateWeatherEventUseCaseRequest, CreateWeatherEventUseCaseResponse, WeatherEventRepository } from "../interfaces/weather-events-interfaces";

export class CreateWeatherEventUseCase {
    constructor(private weatherEventRepository: WeatherEventRepository) {}

    async execute({ name, state, city, status }: CreateWeatherEventUseCaseRequest): Promise<CreateWeatherEventUseCaseResponse> {
        const event = await this.weatherEventRepository.create({
            name, state, city, status
        });

        return { event }
    }
}