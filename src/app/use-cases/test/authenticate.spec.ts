import { describe, it, expect, beforeEach } from "vitest";
import { AuthenticateUseCase } from "../authenticate";
import { InMemoryAccountRepository } from "../../repositories/in-memory/in-memory-account-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../../exceptions/invalid-credentials-error";
import { InMemoryActivationAccount } from "@/app/repositories/in-memory/in-memory-activation-account-repository";
import { ActivationAccountError } from "@/app/exceptions/activation-account-error";

let accountsRepository: InMemoryAccountRepository;
let activationAccount: InMemoryActivationAccount;
let sut: AuthenticateUseCase; 

describe('Authenticate Use Case', () => {

    beforeEach(() => {
        accountsRepository = new InMemoryAccountRepository();
        activationAccount = new InMemoryActivationAccount();
        sut = new AuthenticateUseCase(accountsRepository, activationAccount);
    });

    it('should be able to authenticate', async () => { 
        await accountsRepository.create({
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
        
        const { account } = await sut.execute({
            email: 'johndoe@example.com',
            password: '12345678'
        })

        expect(account.id).toEqual(expect.any(String));
    });

    it('should not be able to authenticate with wrong email', async () => { 
        await accountsRepository.create({
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
        await accountsRepository.create({
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
        const account = await accountsRepository.create({
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
            account_id: account.id
        });

        await expect(() =>
            sut.execute({
                email: 'johndoe@example.com',
                password: '12345678'
            })
        ).rejects.toBeInstanceOf(ActivationAccountError);  
    }); 
});