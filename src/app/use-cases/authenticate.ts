import { compare } from "bcryptjs";
import { AuthenticateUseCaseRequest, AuthenticateUseCaseResponse, UserRepository } from "../interfaces/user-interfaces";
import { InvalidCredentialsError } from "../exceptions/invalid-credentials-error";

export class AuthenticateUseCase {
    constructor(private userRepository: UserRepository) {}
    
    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.userRepository.findByEmail(email);
        if(!user) throw new InvalidCredentialsError();

        const doesPasswordsMatches = await compare(password, user.passwordHash);

        if(!doesPasswordsMatches) throw new InvalidCredentialsError();

        return { user }
    }
}