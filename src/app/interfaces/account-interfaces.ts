import { Prisma, Account  } from "@prisma/client";

export interface AccountRepository {
    create(data: Prisma.AccountCreateInput): Promise<Account>;
    findByEmail(email: string): Promise<Account | null>;
    findById(id: string): Promise<Account | null>;
    update(id: string, data: Prisma.AccountUncheckedUpdateInput): Promise<Account | null>;
    delete(id: string): Promise<void>;
}

export interface RegisterUseCaseRequest {
    name: string,
    authorName: string | null,
    email: string,
    phone: string,
    password: string,
    cnpj_cpf: string,
    state: string,
    city: string, 
    cep: string,
    address: string,
    avatarImage: string | null,
}

export interface RegisterUseCaseResponse {
    account: Account;
}

export interface AuthenticateUseCaseRequest {
    email: string,
    password: string
}

export interface AuthenticateUseCaseResponse {
    account: Account;
}

export interface GetAccountUseCaseRequest {
    id: string,
}

export interface GetAccountUseCaseResponse {
    account: Account
}

export interface dataUpdate {
    name?: string,
    authorName?: string | null,
    email?: string,
    phone?: string,
    password?: string,
    cnpj_cpf?: string,
    state?: string,
    city?: string, 
    cep?: string,
    address?: string,
}

export interface UpdateAccountUseCaseRequest {
    id: string,
    avatarImage?: string | null,
    data: dataUpdate
}
export interface UpdateAccountUseCaseResponse {
    account: Account
}