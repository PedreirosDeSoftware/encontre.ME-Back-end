import { compare } from "bcryptjs";
import { AuthenticateUseCaseRequest, AuthenticateUseCaseResponse, AccountRepository } from "../interfaces/account-interfaces";
import { InvalidCredentialsError } from "../exceptions/invalid-credentials-error";
import { ActivationAccountRepository } from "../interfaces/activation-account-interfaces";
import { ActivationAccountError } from "../exceptions/activation-account-error";

export class AuthenticateUseCase {
    constructor(private accountRepository: AccountRepository, 
                private activationAccount: ActivationAccountRepository) {}
    
    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const account = await this.accountRepository.findByEmail(email);
        if(!account) throw new InvalidCredentialsError();  

        const doesPasswordsMatches = await compare(password, account.passwordHash);
        if(!doesPasswordsMatches) throw new InvalidCredentialsError();

        const accountActivation = await this.activationAccount.findByAccountId(account?.id as string)
        if(!account || accountActivation?.activation === null) throw new ActivationAccountError();  

        return { account }
    }
}