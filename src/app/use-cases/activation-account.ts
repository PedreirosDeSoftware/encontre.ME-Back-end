import { ResourceNotFound } from "../exceptions/resource-not-found";
import { ActivationAccountRepository } from "../interfaces/activation-account-interfaces";

export class ActivationAccountUseCase {
    constructor(private activationAccount: ActivationAccountRepository) {}

    async execute(accountId: string) {
        const accountActivation = await this.activationAccount.accountActivation(accountId);
        if (!accountActivation) throw new ResourceNotFound();
        return accountActivation;
    }
}