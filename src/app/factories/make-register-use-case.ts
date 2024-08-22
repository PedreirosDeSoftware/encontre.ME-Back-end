import { PrismaActivationAccount } from "../repositories/prisma/prisma-activation-account";
import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";
import { RegisterUseCase } from "../use-cases/register";

export function makeRegisterUseCase() {
    const userRepository = new PrismaUserRepository();
    const activationAccount = new PrismaActivationAccount();
    const useCase = new RegisterUseCase(userRepository, activationAccount);
    return useCase;
}