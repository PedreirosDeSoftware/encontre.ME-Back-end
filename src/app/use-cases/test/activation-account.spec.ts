import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryActivationAccount } from "@/app/repositories/in-memory/in-memory-activation-account-repository";
import { ActivationAccountUseCase } from "../activation-account";

let activationAccount: InMemoryActivationAccount;
let sut: ActivationAccountUseCase; 

describe('Activation Account Use Case', () => {

    beforeEach(() => {
        activationAccount = new InMemoryActivationAccount();
        sut = new ActivationAccountUseCase(activationAccount);
    });

    it('should be able to activation account', async () => { 
        await activationAccount.create({
            user_id: 'user-1',
       });
        const account = await sut.execute('user-1');
        
        expect(account?.activation).toEqual(expect.any(Date));
    });
});