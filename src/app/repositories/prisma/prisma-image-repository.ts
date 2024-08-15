import { ImageRepository } from "@/app/interfaces/image-interfaces";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaImageRepository implements ImageRepository {

    async create(data: Prisma.ImageUncheckedCreateInput) {
        const image = await prisma.image.create({
            data
        });

        return image;
    }
}