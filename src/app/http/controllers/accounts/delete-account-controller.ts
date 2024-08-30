import { RequestHandler } from "express";
import { z, ZodError } from "zod";
import { makeDeleteAccountUseCase } from "@/app/factories/make-delete-account-use-case";

export const deleteAccountController: RequestHandler = async (req, res) => {
    const deleteAccountParamsSchema = z.object({
        id: z.string().uuid()
    });

    const { id } = deleteAccountParamsSchema.parse(req.params);

    try {
        const deleteAccountUseCase = makeDeleteAccountUseCase();
        await deleteAccountUseCase.execute(id);

        return res.status(204).json()

    } catch (error) {
        if (error instanceof ZodError)   {
            return res.status(400).json({ 
                message: "Invalid Request",
                error: error.flatten().fieldErrors 
            });
        } 
        
        if (error) {
            return res.status(400).json({ message: 'Account Not Found.' });
        }
        throw error
    }
}