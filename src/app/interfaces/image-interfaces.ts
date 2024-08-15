import { Image, Prisma } from "@prisma/client";

export interface ImageRepository {
    create(data: Prisma.ImageUncheckedCreateInput): Promise<Image>;
}