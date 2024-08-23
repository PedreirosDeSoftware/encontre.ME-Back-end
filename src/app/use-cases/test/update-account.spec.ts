import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryAccountRepository } from "../../repositories/in-memory/in-memory-account-repository";
import { UpdateAccountUseCase } from "../update-account";
import { hash } from "bcryptjs";

let accountsRepository: InMemoryAccountRepository;
let sut: UpdateAccountUseCase; 

describe('Update Account Use Case', () => {

    beforeEach(() => {
        accountsRepository = new InMemoryAccountRepository();
        sut = new UpdateAccountUseCase(accountsRepository);
    });

    it('should be able to update account', async () => { 
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
            avatarImage: null,
            authorName: null
        })
        const updateAccount = await sut.execute({
            id: account.id,
            data: {
                name: 'john doe 2'
            }
        });
        
        expect(updateAccount.account).toEqual(expect.objectContaining({ name: 'john doe 2' }));
    });
});