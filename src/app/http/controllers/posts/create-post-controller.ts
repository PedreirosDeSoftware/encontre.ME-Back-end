import { makeCreatePostUseCase } from "@/app/factories/make-create-post-use-case";
import { PostAlreadyExistsError } from "@/app/exceptions/post-already-exist-error";
import { RequestHandler } from "express";
import { z, ZodError } from "zod";
import { FilePath } from "@/app/interfaces/post-interfaces";
import { InvalidRequestError } from "@/app/exceptions/invalid-request-images-error";
import { initializeApp } from "firebase/app";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { firebaseConfig } from "@/app/config/firebase-config";
import { randomUUID } from "node:crypto";

export const createPostController: RequestHandler = async (req, res) => {
    const createPostParamsSchema = z.object({
        account_id: z.string().uuid(),
    });

    const createPostBodySchema = z.object({
        fullName: z.string(),
        description: z.string(),
        contact: z.string(),
    });

    const { account_id } = createPostParamsSchema.parse(req.params);
    const { fullName, description, contact } = createPostBodySchema.parse(
        req.body
    );

    initializeApp(firebaseConfig);
    const storage = getStorage();

    const images: FilePath[] = req.files as Express.Multer.File[];

    for (let image of images) {
        const storageRef = ref(
            storage,
            `imagens/${randomUUID()}-${image.originalname}`
        );

        const metadata = {
            contentType: image.mimetype,
        };
        const snapshot = await uploadBytesResumable(
            storageRef,
            image.buffer as Buffer,
            metadata
        );
        const downloadUrl = await getDownloadURL(snapshot.ref);
        image.path = downloadUrl;
    }

    try {
        const createPostUseCase = makeCreatePostUseCase();
        await createPostUseCase.execute({
            fullName,
            description,
            contact,
            images,
            account_id,
        });

        return res.status(201).json();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Invalid Request",
                error: error.flatten().fieldErrors,
            });
        }

        if (error instanceof PostAlreadyExistsError) {
            return res.status(400).json({ message: error.message });
        }
        if (error instanceof InvalidRequestError) {
            return res.status(400).json({ message: error.message });
        }
        throw error;
    }
};
