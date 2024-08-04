import { WeatherEventRepository } from "@/app/interfaces/weather-events-interfaces";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaWeatherEventRepository implements WeatherEventRepository {

    async create(data: Prisma.WeatherEventCreateInput) {
        const event = await prisma.weatherEvent.create({
            data
        });

        return event;
    }
}