import { makeGetSpecificUseCase } from "@/app/factories/make-get-specific-post-use-case";
import { ResourceNotFound } from "@/app/exceptions/resource-not-found";
import { RequestHandler } from "express";
import { z } from "zod";

export const getSpecificPostController: RequestHandler = async (req, res) => {
    const getSpecificParamsSchema = z.object({
        id: z.string().uuid()
    });  
 
    const { id } = getSpecificParamsSchema.parse(req.params)

    try {
        const getSpecificPostUseCase = makeGetSpecificUseCase()
        const post = await getSpecificPostUseCase.execute({ id });

        return res.status(200).json(post);

    } catch (error) {
        if (error instanceof ResourceNotFound) {
            return res.status(400).json({ message: error.message });
        }
        throw error
    }
}