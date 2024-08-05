import { describe, it, expect, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { compare, hash } from "bcryptjs";
import { EmailAlreadyExistsError } from "../exceptions/email-already-exists-error";
import { GetUserUseCase } from "./get-user";

let usersRepository: InMemoryUserRepository;
let sut: GetUserUseCase; 

describe('Get User Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUserRepository();
        sut = new GetUserUseCase(usersRepository);
    });

    it('should be able to get a user', async () => { 
        const userId = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            passwordHash: await hash('12345678', 6),
            cnpj_cpf: "12345678978",
            state: "Brazil",
            phone: "55 61 9999-9999",
            city: "São Paulo",
            cep: "12345678",
            address: "rua nada",
            imagesUrl: null,
            authorName: null
        })
        const { user } = await sut.execute({
            id: userId.id
        });
        
        expect(user).toEqual(expect.objectContaining({ name: 'John Doe' }));
    });
});