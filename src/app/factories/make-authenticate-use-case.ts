import { PrismaActivationAccount } from "../repositories/prisma/prisma-activation-account";
import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "../use-cases/authenticate";

export function makeAuthenticateUseCase() {
    const userRepository = new PrismaUserRepository();
    const activationAccount = new PrismaActivationAccount();
    const useCase = new AuthenticateUseCase(userRepository, activationAccount);
    return useCase;
}