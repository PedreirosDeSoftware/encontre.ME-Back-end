import { RequestHandler } from "express";
import { z, ZodError } from "zod";
import { ResourceNotFound } from "@/app/exceptions/resource-not-found";
import { makeGetAccountUseCase } from "@/app/factories/make-get-account-use-case";

export const getAccountController: RequestHandler = async (req, res) => {
    const getAccountParamsSchema = z.object({
        id: z.string().uuid()
    });

    const { id } = getAccountParamsSchema.parse(req.params);

    try {
        const getAccountUseCase = makeGetAccountUseCase();
        const { account } = await getAccountUseCase.execute({ id });

        return res.status(200).json({ account: {
                id: account.id,
                name: account.name,
                state: account.state,
                city: account.city,
                address: account.address,
                avatarImage: account.avatarImage
            } 
        });

    } catch (error) {
        if (error instanceof ZodError)   {
            return res.status(400).json({ 
                message: "Invalid Request",
                error: error.flatten().fieldErrors 
            });
        } 
        
        if (error instanceof ResourceNotFound) {
            return res.status(400).json({ message: error.message });
        }
        throw error
    }
}