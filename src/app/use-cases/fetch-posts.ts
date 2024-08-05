import { ResourceNotFound } from "../exceptions/resource-not-found";
import { FetchPostsUseCaseRequest, FetchPostsUseCaseResponse, PostRepository } from "../interfaces/post-interfaces";

export class FetchPostsUseCase {
    constructor(private postRepository: PostRepository) {}

    async execute({ event }: FetchPostsUseCaseRequest): Promise<FetchPostsUseCaseResponse> {
        const posts = await this.postRepository.findAll(event);
        if (!posts) throw new ResourceNotFound()
        return { posts }
    }
}