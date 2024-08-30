import { PrismaPostRepository } from "../repositories/prisma/prisma-post-repository";
import { UpdateFoundPostUseCase } from "../use-cases/update-found-post";

export function makeUpdateFoundPostUseCase() {
    const postRepository = new PrismaPostRepository();
    const useCase = new UpdateFoundPostUseCase(postRepository);
    return useCase;
}