import { makeCreatePostUseCase } from "@/app/factories/make-create-post-use-case";
import { makeFetchPostsUseCase } from "@/app/factories/make-fetch-posts-use-case";
import { PostAlreadyExistsError } from "@/app/exceptions/post-already-exist-error";
import { RequestHandler } from "express";
import { z } from "zod";

export const fetchPostsController: RequestHandler = async (req, res) => {
    const fetchPostsParamsSchema = z.object({
        event: z.boolean().optional()
    });


    const event = fetchPostsParamsSchema.parse(req.query)

    try {
        const fetchPostsUseCase = makeFetchPostsUseCase()

        if (!event) {
            const posts = await fetchPostsUseCase.execute({});
            return res.status(200).json({ posts });
        }
        
        const posts = await fetchPostsUseCase.execute({ event: event?.event });
        return res.status(201).json({ posts });

    } catch (error) {
        if (error instanceof PostAlreadyExistsError) {
            return res.status(400).json({ message: error.message });
        }
        throw error
    }
}