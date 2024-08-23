import { makeCreatePostUseCase } from "@/app/factories/make-create-post-use-case";
import { PostAlreadyExistsError } from "@/app/exceptions/post-already-exist-error";
import { RequestHandler } from "express";
import { z } from "zod";
import { FilePath } from "@/app/interfaces/post-interfaces";
import { InvalidRequestError } from "@/app/exceptions/invalid-request-images-error";

export const createPostController: RequestHandler = async (req, res) => {
    const createPostParamsSchema = z.object({
        account_id: z.string().uuid(),
    });

    const createPostBodySchema = z.object({
        fullName: z.string(),
        description: z.string(),
        contact: z.string(),
    })

    const {  account_id } = createPostParamsSchema.parse(req.params);
    const { fullName, description, contact } = createPostBodySchema.parse(req.body);

    const images: FilePath[] = req.files
        ? (req.files as Express.Multer.File[]).map(file => ({ url: file.path ?? '' }))
        : [];


    try {             
        const createPostUseCase = makeCreatePostUseCase()
        await createPostUseCase.execute({
            fullName, description, contact, images, 
            account_id,  
        });

        return res.status(201).json();

    } catch (error) {
        if (error instanceof PostAlreadyExistsError) {
            return res.status(400).json({ message: error.message });
        }
        if (error instanceof InvalidRequestError) {
            return res.status(400).json({ message: error.message });
        }
        throw error
    }
}