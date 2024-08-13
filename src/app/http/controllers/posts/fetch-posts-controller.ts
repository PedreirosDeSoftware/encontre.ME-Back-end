import { makeFetchPostsUseCase } from "@/app/factories/make-fetch-posts-use-case";
import { RequestHandler } from "express";
import { z } from "zod";
import { ResourceNotFound } from "@/app/exceptions/resource-not-found";

export const fetchPostsController: RequestHandler = async (req, res) => {
    const fetchPostsParamsSchema = z.object({
        fullName: z.string().optional(),
        event: z.boolean().optional()
    });


    const { fullName, event } = fetchPostsParamsSchema.parse(req.query)

    try {
        const fetchPostsUseCase = makeFetchPostsUseCase()        
        const posts = await fetchPostsUseCase.execute({ fullName, event });
        return res.status(200).json(posts);

    } catch (error) {
        if (error instanceof ResourceNotFound) {
            return res.status(404).json({ message: error.message });
        }
        throw error
    }
}