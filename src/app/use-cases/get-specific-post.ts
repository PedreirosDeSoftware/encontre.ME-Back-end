import { ResourceNotFound } from "../exceptions/resource-not-found";
import { GetSpecificPostUseCaseRequest, GetSpecificPostUseCaseResponse, PostRepository } from "../interfaces/post-interfaces";

export class GetSpecificPostUseCase {
    constructor(private postRepository: PostRepository) {}

    async execute({ name }: GetSpecificPostUseCaseRequest): Promise<GetSpecificPostUseCaseResponse> {
        const post = await this.postRepository.findByName(name);
        if (!post) throw new ResourceNotFound()

        return { post }
    }
}