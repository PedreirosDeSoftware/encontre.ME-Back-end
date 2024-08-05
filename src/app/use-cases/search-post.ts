import { PostRepository, SearchPostUseCaseRequest, SearchPostUseCaseResponse } from "../interfaces/post-interfaces";

export class SearchPostUseCase {
    constructor(private postRepository: PostRepository) {}

    async execute({ query }: SearchPostUseCaseRequest): Promise<SearchPostUseCaseResponse> {
        const posts = await this.postRepository.searchPosts(query);
        return { posts }
    }
}