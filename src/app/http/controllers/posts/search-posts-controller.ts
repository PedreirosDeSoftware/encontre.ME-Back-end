import { makeSearchPostUseCase } from "@/app/factories/make-search-post-use-case";
import { RequestHandler } from "express";
import { z } from "zod";

export const searchPostController: RequestHandler = async (req, res) => {
    const searchPostQuerySchema = z.object({
        query: z.string()
    });  
 
    const { query } = searchPostQuerySchema.parse(req.query)

    try {
        const searchPostUseCase = makeSearchPostUseCase()
        const posts = await searchPostUseCase.execute({ query });

        return res.status(200).json(posts);

    } catch (error) {
        throw error
    }
}