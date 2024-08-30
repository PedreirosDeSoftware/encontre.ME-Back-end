import { ResourceNotFound } from "../exceptions/resource-not-found";
import { PostRepository, UpdateFoundPostUseCaseRequest, UpdateFoundPostUseCaseResponse } from "../interfaces/post-interfaces";

export class UpdateFoundPostUseCase {
    constructor(private postRepository: PostRepository) {}

    async execute({ id }: UpdateFoundPostUseCaseRequest): Promise<UpdateFoundPostUseCaseResponse> {
        const post = await this.postRepository.updateFoundPost(id);
        if (!post) throw new ResourceNotFound()

        return { post }
    }
}