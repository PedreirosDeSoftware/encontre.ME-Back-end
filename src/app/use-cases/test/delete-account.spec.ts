import { describe, it, expect, beforeEach } from "vitest";
import { RegisterUseCase } from "../register";
import { InMemoryAccountRepository } from "../../repositories/in-memory/in-memory-account-repository";
import { compare, hash } from "bcryptjs";
import { EmailAlreadyExistsError } from "../../exceptions/email-already-exists-error";
import { InMemoryActivationAccount } from "@/app/repositories/in-memory/in-memory-activation-account-repository";
import { DeleteAccountUseCase } from "../delete-account";

let accountsRepository: InMemoryAccountRepository;
let sut: DeleteAccountUseCase; 

describe('Delete Account Use Case', () => {

    beforeEach(() => {
        accountsRepository = new InMemoryAccountRepository();
        sut = new DeleteAccountUseCase(accountsRepository);
    });

    it('should be able to delete account', async () => { 
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

        await sut.execute(account.id);

        expect(accountsRepository.accounts).toHaveLength(0);
    });
});