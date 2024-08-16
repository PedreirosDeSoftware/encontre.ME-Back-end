import { EventRepository } from "@/app/interfaces/events-interfaces";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaEventRepository implements EventRepository {

    async create(data: Prisma.EventCreateManyInput) {
        const event = await prisma.event.create({
            data
        });

        return event;
    }
}