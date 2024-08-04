import { WeatherEventRepository } from "@/app/interfaces/weather-events-interfaces";
import { Prisma, WeatherEvent } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryWeatherEventRepository implements WeatherEventRepository {
    public events: WeatherEvent[] = [];

    async create(data: Prisma.WeatherEventCreateInput) {
        const event = {
            id: randomUUID(),
            name: data.name,
            state: data.state,
            city: data.city,
            status: data.status ? true : false,
        }

        this.events.push(event);
        return event;
    }
}