import { ResourceNotFound } from "../exceptions/resource-not-found";
import { GetSpecificPostUseCaseRequest, GetSpecificPostUseCaseResponse, PostRepository } from "../interfaces/post-interfaces";

export class GetSpecificPostUseCase {
    constructor(private postRepository: PostRepository) {}

    async execute({ id }: GetSpecificPostUseCaseRequest): Promise<GetSpecificPostUseCaseResponse> {
        const post = await this.postRepository.findById(id);
        if (!post) throw new ResourceNotFound()

        return { post }
    }
}