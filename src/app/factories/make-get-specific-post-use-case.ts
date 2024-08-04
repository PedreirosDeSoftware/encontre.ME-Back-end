import { PrismaPostRepository } from "../repositories/prisma/prisma-post-repository";
import { GetSpecificPostUseCase } from "../use-cases/get-specific-post";

export function makeGetSpecificUseCase() {
    const postRepository = new PrismaPostRepository();
    const useCase = new GetSpecificPostUseCase(postRepository);
    return useCase;
}