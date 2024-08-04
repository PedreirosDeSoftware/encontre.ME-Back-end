import { PrismaPostRepository } from "../repositories/prisma/prisma-post-repository";
import { FetchPostsUseCase } from "../use-cases/fetch-posts";

export function makeFetchPostsUseCase() {
    const postRepository = new PrismaPostRepository();
    const useCase = new FetchPostsUseCase(postRepository);
    return useCase;
}