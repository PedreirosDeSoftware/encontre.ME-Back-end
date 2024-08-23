import { ResourceNotFound } from "../exceptions/resource-not-found";
import { UpdateAccountUseCaseRequest, UpdateAccountUseCaseResponse, AccountRepository } from "../interfaces/account-interfaces";

export class UpdateAccountUseCase {
    constructor (private accountRepository: AccountRepository) {}

    async execute({ id, data, avatarImage }: UpdateAccountUseCaseRequest): Promise<UpdateAccountUseCaseResponse> {

        const dataAccount = {
            name: data.name as string,
            authorName: data.authorName as string,
            email:data.email as string,
            password: data.password as string,
            cnpj_cpf: data.cnpj_cpf as string,
            phone: data.phone as string,
            cep: data.cep as string,
            state: data.state as string,
            city: data.city as string,
            address: data.address as string,
            avatarImage
        }      
        
        const account = await this.accountRepository.update(id, dataAccount);    
        if (!account) throw new ResourceNotFound(); 

        return { account }
    }
}