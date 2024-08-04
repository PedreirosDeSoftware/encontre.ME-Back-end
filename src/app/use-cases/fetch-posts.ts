import { FetchPostsUseCaseRequest, FetchPostsUseCaseResponse, PostRepository } from "../interfaces/post-interfaces";

export class FetchPostsUseCase {
    constructor(private postRepository: PostRepository) {}

    async execute({ event }: FetchPostsUseCaseRequest): Promise<FetchPostsUseCaseResponse> {
        const posts = await this.postRepository.findAll(event);
        return { posts }
    }
}