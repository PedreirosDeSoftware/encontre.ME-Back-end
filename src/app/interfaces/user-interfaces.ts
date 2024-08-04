import { Prisma, User  } from "@prisma/client";

export interface UserRepository {
    create(data: Prisma.UserCreateInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}

export interface RegisterUseCaseRequest {
    name: string,
    authorName: string | null,
    email: string,
    password: string,
    cnpj_cpf: string,
    state: string,
    city: string, 
    cep: string,
    address: string,
}

export interface RegisterUseCaseResponse {
    user: User;
}

export interface AuthenticateUseCaseRequest {
    email: string,
    password: string
}

export interface AuthenticateUseCaseResponse {
    user: User;
}