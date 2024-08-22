import { describe, it, expect, beforeEach } from "vitest";
import { AuthenticateUseCase } from "../authenticate";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../../exceptions/invalid-credentials-error";
import { InMemoryActivationAccount } from "@/app/repositories/in-memory/in-memory-activation-account-repository";
import { ActivationAccountError } from "@/app/exceptions/activation-account-error";

let usersRepository: InMemoryUserRepository;
let activationAccount: InMemoryActivationAccount;
let sut: AuthenticateUseCase; 

describe('Authenticate Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUserRepository();
        activationAccount = new InMemoryActivationAccount();
        sut = new AuthenticateUseCase(usersRepository, activationAccount);
    });

    it('should be able to authenticate', async () => { 
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            passwordHash: await hash('12345678', 6),
            cnpj_cpf: "12345678978",
            phone: "55 61 9999-9999",
            state: "Brazil",
            city: "São Paulo",
            cep: "12345678",
            address: "rua nada",
        })
        
        const { user } = await sut.execute({
            email: 'johndoe@example.com',
            password: '12345678'
        })

        expect(user.id).toEqual(expect.any(String));
    });

    it('should not be able to authenticate with wrong email', async () => { 
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            passwordHash: await hash('12345678', 6),
            cnpj_cpf: "12345678978",
            phone: "55 61 9999-9999",
            state: "Brazil",
            city: "São Paulo",
            cep: "12345678",
            address: "rua nada",
        })
        
        await expect(() =>
            sut.execute({
                email: 'johndoe@example2.com',
                password: '12345678'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should not be able to authenticate with wrong password', async () => { 
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            passwordHash: await hash('12345678', 6),
            cnpj_cpf: "12345678978",
            phone: "55 61 9999-9999",
            state: "Brazil",
            city: "São Paulo",
            cep: "12345678",
            address: "rua nada",
        })
        
        await expect(() =>
            sut.execute({
                email: 'johndoe@example.com',
                password: '123456789'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    }); 

    it('should not be able to authenticate without activating the account', async () => { 
        const user = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            passwordHash: await hash('12345678', 6),
            cnpj_cpf: "12345678978",
            phone: "55 61 9999-9999",
            state: "Brazil",
            city: "São Paulo",
            cep: "12345678",
            address: "rua nada",
        });

        await activationAccount.create({
            user_id: user.id
        });

        await expect(() =>
            sut.execute({
                email: 'johndoe@example.com',
                password: '12345678'
            })
        ).rejects.toBeInstanceOf(ActivationAccountError);  
    }); 
});