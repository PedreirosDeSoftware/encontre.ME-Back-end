import { PrismaActivationAccount } from "../repositories/prisma/prisma-activation-account";
import { PrismaAccountRepository } from "../repositories/prisma/prisma-account-repository";
import { AuthenticateUseCase } from "../use-cases/authenticate";

export function makeAuthenticateUseCase() {
    const accountRepository = new PrismaAccountRepository();
    const activationAccount = new PrismaActivationAccount();
    const useCase = new AuthenticateUseCase(accountRepository, activationAccount);
    return useCase;
}