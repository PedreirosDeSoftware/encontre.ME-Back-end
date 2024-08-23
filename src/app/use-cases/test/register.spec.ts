import { describe, it, expect, beforeEach } from "vitest";
import { RegisterUseCase } from "../register";
import { InMemoryAccountRepository } from "../../repositories/in-memory/in-memory-account-repository";
import { compare } from "bcryptjs";
import { EmailAlreadyExistsError } from "../../exceptions/email-already-exists-error";
import { InMemoryActivationAccount } from "@/app/repositories/in-memory/in-memory-activation-account-repository";

let accountsRepository: InMemoryAccountRepository;
let activationAccount: InMemoryActivationAccount;
let sut: RegisterUseCase; 

describe('Register Use Case', () => {

    beforeEach(() => {
        accountsRepository = new InMemoryAccountRepository();
        activationAccount = new InMemoryActivationAccount();
        sut = new RegisterUseCase(accountsRepository, activationAccount);
    });

    it('should be able to register', async () => { 
        const { account } = await sut.execute({
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
        
        expect(account.id).toEqual(expect.any(String));
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

    it('should hash account password upon registration', async () => { 

        const { account } = await sut.execute({
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
        const isPasswordCorrectlyHashed = await compare('12345678', account.passwordHash);
        expect(isPasswordCorrectlyHashed).toBe(true);
    });
});