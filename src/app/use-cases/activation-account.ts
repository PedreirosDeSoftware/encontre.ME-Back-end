import { ActivationAccountRepository } from "../interfaces/activation-account-interfaces";

export class ActivationAccountUseCase {
    constructor(private activationAccount: ActivationAccountRepository) {}

    async execute(userId: string) {
        const accountActivation = await this.activationAccount.accountActivation(userId);
        return accountActivation;
    }
}