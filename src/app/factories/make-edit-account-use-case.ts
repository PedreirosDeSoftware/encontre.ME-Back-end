import { PrismaAccountRepository } from "../repositories/prisma/prisma-account-repository";
import { UpdateAccountUseCase } from "../use-cases/update-account";

export function makeEditAccountUseCase() {
    const accountRepository = new PrismaAccountRepository();
    const useCase = new UpdateAccountUseCase(accountRepository);
    return useCase;
}