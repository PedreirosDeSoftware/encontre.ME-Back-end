import { PrismaAccountRepository } from "../repositories/prisma/prisma-account-repository";
import { GetAccountUseCase } from "../use-cases/get-account";

export function makeGetAccountUseCase() {
    const accountRepository = new PrismaAccountRepository();
    const useCase = new GetAccountUseCase(accountRepository);
    return useCase;
}