import { ResourceNotFound } from "../exceptions/resource-not-found";
import { GetUserUseCaseRequest, GetUserUseCaseResponse, UserRepository } from "../interfaces/user-interfaces";

export class GetUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ id }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
        const user = await this.userRepository.findById(id);
        if (!user) throw new ResourceNotFound()

        return { user }
    }
}