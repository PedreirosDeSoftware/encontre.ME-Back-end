import { PrismaImageRepository } from "../repositories/prisma/prisma-image-repository";
import { PrismaPostRepository } from "../repositories/prisma/prisma-post-repository";
import { CreatePostUseCase } from "../use-cases/create-post";

export function makeCreatePostUseCase() {
    const postRepository = new PrismaPostRepository();
    const imageRepository = new PrismaImageRepository();
    const useCase = new CreatePostUseCase(postRepository, imageRepository);
    return useCase;
}