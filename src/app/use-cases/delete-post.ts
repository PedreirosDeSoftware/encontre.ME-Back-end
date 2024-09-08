import { PostRepository } from "../interfaces/post-interfaces";
export class DeletePostUseCase{
    constructor(private postRepository: PostRepository) {}

    async execute(id: string): Promise<void> {
      return await this.postRepository.delete(id);
    }
}