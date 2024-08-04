import { Prisma, WeatherEvent } from "@prisma/client";

export interface WeatherEventRepository {
    create(data: Prisma.WeatherEventCreateInput): Promise<WeatherEvent>;
}

export interface CreateWeatherEventUseCaseRequest {
    name: string,
    state: string,
    city: string,
    status: boolean
}

export interface CreateWeatherEventUseCaseResponse {
    event: WeatherEvent;
}