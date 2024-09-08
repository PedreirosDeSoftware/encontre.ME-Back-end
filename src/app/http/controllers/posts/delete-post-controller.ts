import { RequestHandler } from "express";
import { z, ZodError } from "zod";
import { makeDeletePostUseCase } from "@/app/factories/make-delete-post-use-case";

export const deletePostController: RequestHandler = async (req, res) => {
    const deletePostParamsSchema = z.object({
        id: z.string().uuid()
    });

    const { id } = deletePostParamsSchema.parse(req.params);

    try {
        const deletePostUseCase = makeDeletePostUseCase();
        await deletePostUseCase.execute(id);

        return res.status(204).json()

    } catch (error) {
        if (error instanceof ZodError)   {
            return res.status(400).json({ 
                message: "Invalid Request",
                error: error.flatten().fieldErrors 
            });
        } 
        
        if (error) {
            return res.status(400).json({ message: 'Post Not Found.' });
        }
        throw error
    }
}