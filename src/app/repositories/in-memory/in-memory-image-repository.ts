import { ImageRepository } from "@/app/interfaces/image-interfaces";
import { Image, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryImageRepository implements ImageRepository {
    public images: Image[] = [];

    async create(data: Prisma.ImageUncheckedCreateInput) {
        const image = {
            id: randomUUID(),
            ...data
        }

        this.images.push(image);
        return image;
    }
}