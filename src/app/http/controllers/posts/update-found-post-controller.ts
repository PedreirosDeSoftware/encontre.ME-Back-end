import { ResourceNotFound } from "@/app/exceptions/resource-not-found";
import { RequestHandler } from "express";
import { z, ZodError } from "zod";
import { makeUpdateFoundPostUseCase } from "@/app/factories/make-update-found-post-use-case";

export const updateFoundPostController: RequestHandler = async (req, res) => {
    const getSpecificParamsSchema = z.object({
        id: z.string().uuid()
    });  
 
    const { id } = getSpecificParamsSchema.parse(req.params)

    try {
        const foundPostUseCase = makeUpdateFoundPostUseCase()
        const { post }= await foundPostUseCase.execute({ id });

        return res.status(200).json({
            post: {
                id: post.id,
                found: post.found
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