import { makeGetSpecificUseCase } from "@/app/ factories/make-get-specific-post-use-case";
import { ResourceNotFound } from "@/app/exceptions/resource-not-found";
import { RequestHandler } from "express";
import { z } from "zod";

export const getSpecificPostPostController: RequestHandler = async (req, res) => {
    const getSpecificParamsSchema = z.object({
        name: z.string()
    });  
 
    const { name } = getSpecificParamsSchema.parse(req.query)

    try {
        const getSpecificPostUseCase = makeGetSpecificUseCase()
        const post = await getSpecificPostUseCase.execute({
            name 
        });

        return res.status(201).json({ post });

    } catch (error) {
        if (error instanceof ResourceNotFound) {
            return res.status(404).json({ message: error.message });
        }
        throw error
    }
}