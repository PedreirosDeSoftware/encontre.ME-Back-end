import { Prisma, Event } from "@prisma/client";

export interface EventRepository {
    create(data: Prisma.EventCreateManyInput): Promise<Event>;
}

export interface EventUseCaseRequest {
    name: string,
    state: string,
    city: string,
    status: boolean
}

export interface EventUseCaseResponse {
    event: Event;
}