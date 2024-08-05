import { PostAlreadyExistsError } from "../exceptions/post-already-exist-error";
import { CreatePostUseCaseRequest, CreatePostUseCaseResponse, PostRepository } from "../interfaces/post-interfaces";

export class CreatePostUseCase {
    constructor(private postRepository: PostRepository) {}

    async execute({ fullName, description, imagesUrl, contact, user_id,  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
        const postName = await this.postRepository.findByName(fullName);
        if (postName) throw new PostAlreadyExistsError();
        
        const post = await this.postRepository.create({
            fullName, description, imagesUrl, contact, user_id
        });

        return { post }
    }
}