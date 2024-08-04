import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";
import { GetUserUseCase } from "../use-cases/get-user";

export function makeGetUserUseCase() {
    const userRepository = new PrismaUserRepository();
    const useCase = new GetUserUseCase(userRepository);
    return useCase;
}