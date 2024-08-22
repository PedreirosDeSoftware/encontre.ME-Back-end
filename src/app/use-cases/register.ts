
import { ActivationAccountCreateError } from "../exceptions/activation-account-create-error";
import { EmailAlreadyExistsError } from "../exceptions/email-already-exists-error";
import { ActivationAccountRepository } from "../interfaces/activation-account-interfaces";
import { RegisterUseCaseRequest, RegisterUseCaseResponse, UserRepository } from "../interfaces/user-interfaces";
import { hash } from "bcryptjs";

export class RegisterUseCase {
    constructor(private userRepository: UserRepository,
                private activationAccount: ActivationAccountRepository) {}

    async execute({ name, authorName, email, password, cnpj_cpf, phone, avatarImage, state, city, cep, address }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        
        const passwordHash = await hash(password, 6);

        const userWithSameEmail = await this.userRepository.findByEmail(email);
        if (userWithSameEmail) throw new EmailAlreadyExistsError();
        
        const user = await this.userRepository.create({ 
            name, authorName, email, passwordHash, cnpj_cpf, phone, state, avatarImage, city, cep, address 
         });

         if(user) {
            await this.activationAccount.create({
                user_id: user.id,
            });
        } else {
            throw new ActivationAccountCreateError();
        }

         return { user }
    }
}