import { compare } from "bcryptjs";
import { AuthenticateUseCaseRequest, AuthenticateUseCaseResponse, UserRepository } from "../interfaces/user-interfaces";
import { InvalidCredentialsError } from "../exceptions/invalid-credentials-error";
import { ActivationAccountRepository } from "../interfaces/activation-account-interfaces";
import { ActivationAccountError } from "../exceptions/activation-account-error";

export class AuthenticateUseCase {
    constructor(private userRepository: UserRepository, 
                private activationAccount: ActivationAccountRepository) {}
    
    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.userRepository.findByEmail(email);
        if(!user) throw new InvalidCredentialsError();  

        const doesPasswordsMatches = await compare(password, user.passwordHash);
        if(!doesPasswordsMatches) throw new InvalidCredentialsError();

        const account = await this.activationAccount.findByUserId(user?.id as string)
        if(account?.activation === null) throw new ActivationAccountError();  

        return { user }
    }
}