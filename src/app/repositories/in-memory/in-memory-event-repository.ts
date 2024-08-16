import { EventRepository } from "@/app/interfaces/events-interfaces";
import { Prisma, Event } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryEventRepository implements EventRepository {
    public events: Event[] = [];

    async create(data: Prisma.EventCreateManyInput) {
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