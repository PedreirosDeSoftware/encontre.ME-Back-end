import { makeCreatePostUseCase } from "@/app/ factories/make-create-post-use-case";
import { PostAlreadyExistsError } from "@/app/exceptions/post-already-exist-error";
import { RequestHandler } from "express";
import { z } from "zod";

export const createPostController: RequestHandler = async (req, res) => {
    const createPostParamsSchema = z.object({
        userId: z.string(),
        weatherId: z.string()
    });

    const createPostBodySchema = z.object({
        fullName: z.string(),
        description: z.string(),
        contact: z.string(),
        imagesUrl: z.string(),
    })

    const { userId, weatherId } = createPostParamsSchema.parse(req.params);
    const { fullName, description, contact, imagesUrl } = createPostBodySchema.parse(req.body);

    try {
        const createPostUseCase = makeCreatePostUseCase()
        await createPostUseCase.execute({
            fullName, description, contact, imagesUrl, user_id: userId, weather_id: weatherId 
        });

        return res.status(201).json();

    } catch (error) {
        if (error instanceof PostAlreadyExistsError) {
            return res.status(400).json({ message: error.message });
        }
        throw error
    }
}