import { makeRegisterUseCase } from "@/app/factories/make-register-use-case";
import { EmailAlreadyExistsError } from "@/app/exceptions/email-already-exists-error";
import { RequestHandler } from "express";
import { z }from "zod";

export const registerController: RequestHandler = async (req, res) => {
    const registerBodySchema = z.object({
        name: z.string(),
        authorName: z.string().nullable(), 
        email: z.string().email(),
        password: z.string().min(8),
        cnpj_cpf: z.string(),
        state: z.string(),
        city: z.string(),
        cep: z.string().max(8),
        address: z.string(),
    });
    

    const { name, authorName = null, email, password, cnpj_cpf, state, city, cep, address } = registerBodySchema.parse(req.body);

    try {
        const registerUseCase = makeRegisterUseCase()
        await registerUseCase.execute({
            name, email, password, cnpj_cpf, state, city, cep, address, authorName
        });

        return res.status(201).json();

    } catch (error) {
        if (error instanceof EmailAlreadyExistsError) {
            return res.status(409).json({ message: error.message });
        }
        throw error
    }
}