import { ResourceNotFound } from "@/app/exceptions/resource-not-found";
import { makeActivationAccountUseCase } from "@/app/factories/make-activation-account-use-case";
import { RequestHandler } from "express";
import z from "zod";

export const activationAccountController: RequestHandler = async (req, res) => {
    const activationAccountParamsSchema = z.object({
        id: z.string().uuid()
    });

    const { id } = activationAccountParamsSchema.parse(req.params);

    try {
        
        const activationAccount = makeActivationAccountUseCase()
        const account = await activationAccount.execute(id);
        if (account) return res.status(301).redirect('http://localhost:5173/login')  

    } catch (error) {
        if (error instanceof ResourceNotFound) {
            return res.status(400).json({ message: error.message });
        }

        throw error;
    }

    
}