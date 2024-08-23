import { PrismaActivationAccount } from "../repositories/prisma/prisma-activation-account";
import { PrismaAccountRepository } from "../repositories/prisma/prisma-account-repository";
import { RegisterUseCase } from "../use-cases/register";

export function makeRegisterUseCase() {
    const accountRepository = new PrismaAccountRepository();
    const activationAccount = new PrismaActivationAccount();
    const useCase = new RegisterUseCase(accountRepository, activationAccount);
    return useCase;
}