import { ResourceNotFound } from "../exceptions/resource-not-found";
import { GetAccountUseCaseRequest, GetAccountUseCaseResponse, AccountRepository } from "../interfaces/account-interfaces";

export class GetAccountUseCase {
    constructor(private accountRepository: AccountRepository) {}

    async execute({ id }: GetAccountUseCaseRequest): Promise<GetAccountUseCaseResponse> {
        const account = await this.accountRepository.findById(id);
        if (!account) throw new ResourceNotFound()

        return { account }
    }
}