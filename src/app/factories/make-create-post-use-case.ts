import { PrismaPostRepository } from "../repositories/prisma/prisma-post-repository";
import { CreatePostUseCase } from "../use-cases/create-post";

export function makeCreatePostUseCase() {
    const postRepository = new PrismaPostRepository();
    const useCase = new CreatePostUseCase(postRepository);
    return useCase;
}