
import { EmailAlreadyExistsError } from "../exceptions/email-already-exists-error";
import { RegisterUseCaseRequest, RegisterUseCaseResponse, UserRepository } from "../interfaces/user-interfaces";
import { hash } from "bcryptjs";


export class RegisterUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ name, authorName, email, password, cnpj_cpf, state, city, cep, address }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        
        const passwordHash = await hash(password, 6);

        const userWithSameEmail = await this.userRepository.findByEmail(email);
        if (userWithSameEmail) throw new EmailAlreadyExistsError();
        
        const user = await this.userRepository.create({ 
            name, authorName, email, passwordHash, cnpj_cpf, state, city, cep, address 
         });

         return { user }
    }
}