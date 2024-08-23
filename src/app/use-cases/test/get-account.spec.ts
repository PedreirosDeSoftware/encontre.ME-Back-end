import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryAccountRepository } from "../../repositories/in-memory/in-memory-account-repository";
import { hash } from "bcryptjs";
import { GetAccountUseCase } from "../get-account";

let accountsRepository: InMemoryAccountRepository;
let sut: GetAccountUseCase; 

describe('Get Account Use Case', () => {

    beforeEach(() => {
        accountsRepository = new InMemoryAccountRepository();
        sut = new GetAccountUseCase(accountsRepository);
    });

    it('should be able to get a account', async () => { 
        const accountId = await accountsRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            passwordHash: await hash('12345678', 6),
            cnpj_cpf: "12345678978",
            state: "Brazil",
            phone: "55 61 9999-9999",
            city: "São Paulo",
            cep: "12345678",
            address: "rua nada",
            avatarImage: null,
            authorName: null
        })
        const { account } = await sut.execute({
            id: accountId.id
        });
        
        expect(account).toEqual(expect.objectContaining({ name: 'John Doe' }));
    });
});