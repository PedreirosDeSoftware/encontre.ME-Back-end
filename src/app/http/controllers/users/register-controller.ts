import { makeRegisterUseCase } from "@/app/factories/make-register-use-case";
import { EmailAlreadyExistsError } from "@/app/exceptions/email-already-exists-error";
import { RequestHandler } from "express";
import { z }from "zod";

export const registerController: RequestHandler = async (req, res) => {
    const registerBodySchema = z.object({
        name: z.string(),
        authorName: z.string().nullish(), 
        email: z.string().email(),
        password: z.string().min(8),
        cnpj_cpf: z.string(),
        phone: z.string(),
        state: z.string(),
        city: z.string(),
        cep: z.string().max(8),
        address: z.string(),
    });
    
    const { name, authorName = null , email, password, cnpj_cpf, phone, state, city, cep, address } = registerBodySchema.parse(req.body);

    const avatarImage = req.file?.path ?? null;
    
    try {
        const registerUseCase = makeRegisterUseCase()
        const { user } = await registerUseCase.execute({
            name, email, password, cnpj_cpf, phone, state, city, cep, address, authorName, avatarImage
        });

        return res.status(201).json({ user: user.id });

    } catch (error) {
        if (error instanceof EmailAlreadyExistsError) {
            return res.status(409).json({ message: error.message });
        }
        throw error
    }
}