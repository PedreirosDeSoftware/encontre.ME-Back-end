import { PrismaPostRepository } from "../repositories/prisma/prisma-post-repository";
import { SearchPostUseCase } from "../use-cases/search-post";

export function makeSearchPostUseCase() {
    const postRepository = new PrismaPostRepository();
    const useCase = new SearchPostUseCase(postRepository);
    return useCase;
}