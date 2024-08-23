import { PrismaAccountRepository } from "../repositories/prisma/prisma-account-repository";
import { DeleteAccountUseCase } from "../use-cases/delete-account";

export function makeDeleteAccountUseCase() {
    const accountRepository = new PrismaAccountRepository();
    const useCase = new DeleteAccountUseCase(accountRepository);
    return useCase;
}