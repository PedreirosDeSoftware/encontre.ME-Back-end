import { makeCreateWeatherEventUseCase } from "@/app/factories/make-create-weather-event-use-case";
import { RequestHandler } from "express";
import { z } from "zod";

export const createController: RequestHandler = async (req, res) => {
    const createWeatherBodySchema = z.object({
        name: z.string(),
        state: z.string(),
        city: z.string(),
        status: z.boolean().default(true)
    })

    const { name, state, city, status } = createWeatherBodySchema.parse(req.body);

    try {
        const weatherEventUseCase = makeCreateWeatherEventUseCase()
        await weatherEventUseCase.execute({
            name, state, city, status
        });

        return res.status(201).json();

    } catch (error) {
        throw error
    }
}