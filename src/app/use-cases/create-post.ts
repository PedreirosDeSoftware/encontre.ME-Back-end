import { InvalidRequestError } from "../exceptions/invalid-request-images-error";
import { PostAlreadyExistsError } from "../exceptions/post-already-exist-error";
import { ImageRepository } from "../interfaces/image-interfaces";
import { CreatePostUseCaseRequest, CreatePostUseCaseResponse, PostRepository } from "../interfaces/post-interfaces";

export class CreatePostUseCase {
    constructor(private postRepository: PostRepository,
                private imageRepository: ImageRepository) {}

    async execute({ fullName, description, images, contact, account_id }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
        const postName = await this.postRepository.findByName(fullName);
        if (postName) throw new PostAlreadyExistsError();

        const noImages = !images || images.length === 0;
        if (noImages) throw new InvalidRequestError();

        const postPhoto = images.length > 0 ? images[0].url : null;
        
        const post = await this.postRepository.create({
            fullName, description, photo: postPhoto, contact, account_id
        });

        for(const image of images) {
            if(image.url) {
                await this.imageRepository.create({
                    url: image.url,
                    post_id: post.id,
                })
            } else {
                throw new InvalidRequestError()
            }
        }

        return { post }
    }
}