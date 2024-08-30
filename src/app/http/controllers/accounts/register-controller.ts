import { makeRegisterUseCase } from "@/app/factories/make-register-use-case";
import { EmailAlreadyExistsError } from "@/app/exceptions/email-already-exists-error";
import { RequestHandler } from "express";
import { z, ZodError } from "zod";
import { EmailSendingFailureError } from "@/app/exceptions/email-sending-failure-error";
import { MulterError } from "multer";

export const registerController: RequestHandler = async (req, res, next) => {
    const registerBodySchema = z.object({
        name: z.string(),
        authorName: z.string().nullish(), 
        email: z.string().email(),
        password: z.string().min(8),
        cnpj_cpf: z.string(),
        phone: z.string().trim(),
        state: z.string(),
        city: z.string(),
        cep: z.string().max(10),
        address: z.string(),
    });
    
    
    const avatarImage = req.file?.path ?? null;

    try {
        const { name, authorName = null , email, password, cnpj_cpf, phone, state, city, cep, address } = registerBodySchema.parse(req.body);
        const registerUseCase = makeRegisterUseCase()
        const { account } = await registerUseCase.execute({
            name, email, password, cnpj_cpf, phone, state, city, cep, address, authorName, avatarImage
        });        

        return res.status(201).json({ account: account.id });      

    } catch (error) {
        if (error instanceof ZodError)   {
            return res.status(400).json({ 
                message: "Invalid Request",
                error: error.flatten().fieldErrors 
            });
        } 

        if (error instanceof MulterError) {
            return res.status(400).json({
                message: "Error uploading file",
                error: error.message
            });
        }

        if (error instanceof EmailAlreadyExistsError) {
            return res.status(409).json({ message: error.message });
        }

        if (error instanceof EmailSendingFailureError) {
            return res.status(400).json({ message: error.message });
        }

        throw error
    }

}