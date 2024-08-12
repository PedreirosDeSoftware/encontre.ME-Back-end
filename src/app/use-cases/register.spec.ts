import { describe, it, expect, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { compare } from "bcryptjs";
import { EmailAlreadyExistsError } from "../exceptions/email-already-exists-error";

let usersRepository: InMemoryUserRepository;
let sut: RegisterUseCase; 

describe('Register Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUserRepository();
        sut = new RegisterUseCase(usersRepository);
    });

    it('should be able to register', async () => { 
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345678',
            cnpj_cpf: "12345678978",
            phone: "55 61 9999-9999",
            state: "Brazil",
            city: "São Paulo",
            cep: "12345678",
            address: "rua nada",
            avatarImage: null,
            authorName: null
        });
        
        expect(user.id).toEqual(expect.any(String));
    });

    
    it('should not be able to register with same email twice', async () => { 

        const email = 'johndoe@example.com';

        await sut.execute({
            name: 'John Doe',
            email,
            password: '12345678',
            cnpj_cpf: "12345678978",
            phone: "55 61 9999-9999",
            state: "Brazil",
            city: "São Paulo",
            cep: "12345678",
            address: "rua nada",
            avatarImage: null,
            authorName: null
        });

        await expect(() =>
            sut.execute({
                name: 'John Doe',
                email,
                password: '12345678',
                cnpj_cpf: "12345678978",
                phone: "55 61 9999-9999",
                state: "Brazil",
                city: "São Paulo",
                cep: "12345678",
                address: "rua nada",
                avatarImage: null,
                authorName: null
            })
        ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
    
    });

    it('should hash user password upon registration', async () => { 

        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345678',
            cnpj_cpf: "12345678978",
            state: "Brazil",
            city: "São Paulo",
            phone: "55 61 9999-9999",
            cep: "12345678",
            address: "rua nada",
            avatarImage: null,
            authorName: null
        });
        const isPasswordCorrectlyHashed = await compare('12345678', user.passwordHash);
        expect(isPasswordCorrectlyHashed).toBe(true);
    });
});