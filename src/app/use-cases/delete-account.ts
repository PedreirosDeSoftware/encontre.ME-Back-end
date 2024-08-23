import { AccountRepository } from "../interfaces/account-interfaces";

export class DeleteAccountUseCase{
    constructor(private accountRepository: AccountRepository) {}

    async execute(id: string): Promise<void> {
      return await this.accountRepository.delete(id);
    }
}