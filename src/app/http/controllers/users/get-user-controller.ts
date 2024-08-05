import { makeRegisterUseCase } from "@/app/factories/make-register-use-case";
import { EmailAlreadyExistsError } from "@/app/exceptions/email-already-exists-error";
import { RequestHandler } from "express";
import { z }from "zod";
import { makeGetUserUseCase } from "@/app/factories/make-get-user-use-case";
import { ResourceNotFound } from "@/app/exceptions/resource-not-found";

export const getUserController: RequestHandler = async (req, res) => {
    const getUserParamsSchema = z.object({
        id: z.string().uuid()
    });

    const { id } = getUserParamsSchema.parse(req.params);

    try {
        const getUserUseCase = makeGetUserUseCase()
        const { user } = await getUserUseCase.execute({ id });

        return res.status(200).json({ user: {
                id: user.id,
                name: user.name,
                state: user.state,
                city: user.city,
                address: user.address,
                imagesUrl: user.imagesUrl
            } 
        });

    } catch (error) {
        if (error instanceof ResourceNotFound) {
            return res.status(404).json({ message: error.message });
        }
        throw error
    }
}