import { PrismaActivationAccount } from "../repositories/prisma/prisma-activation-account";
import { ActivationAccountUseCase } from "../use-cases/activation-account";

export function makeActivationAccountUseCase() {    
    const activationAccount = new PrismaActivationAccount();
    const useCase = new ActivationAccountUseCase(activationAccount);
    return useCase;
}