import { ActivationAccountCreateError } from "../exceptions/activation-account-create-error";
import { EmailAlreadyExistsError } from "../exceptions/email-already-exists-error";
import { ActivationAccountRepository } from "../interfaces/activation-account-interfaces";
import { RegisterUseCaseRequest, RegisterUseCaseResponse, AccountRepository } from "../interfaces/account-interfaces";
import { hash } from "bcryptjs";
import { sendMailClient } from "../lib/mail";
import { EmailSendingFailureError } from "../exceptions/email-sending-failure-error";
export class RegisterUseCase {
    constructor(private accountRepository: AccountRepository,
                private activationAccount: ActivationAccountRepository) {}

    async execute({ name, authorName, email, password, cnpj_cpf, phone, avatarImage, state, city, cep, address }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        
        const passwordHash = await hash(password, 6);

        const accountWithSameEmail = await this.accountRepository.findByEmail(email);
        if (accountWithSameEmail) throw new EmailAlreadyExistsError();

        const account = await this.accountRepository.create({ 
            name, authorName, email, passwordHash, cnpj_cpf, phone, state, avatarImage, city, cep, address 
         });

        if(account) {
            await this.activationAccount.create({
                account_id: account.id,
            });
        } else {
            throw new ActivationAccountCreateError();
        }

        const message = await sendMailClient(account);        
               
        if (!message) {
            await sendMailClient(account)
            throw new EmailSendingFailureError();   
        }
        
        return { account }
    }
}