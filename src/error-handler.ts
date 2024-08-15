import { ErrorRequestHandler } from "express";
import { MulterError } from "multer";
import { ZodError } from "zod";

export const erroHandler: ErrorRequestHandler = (err, _, res,) => {

    if (err instanceof ZodError) {
        return res.status(400).json({ 
            message: "Invalid request", 
            error: err.format(),
        });
    }

    if (err instanceof MulterError) {
        return res.status(400).json({
            message: "Error uploading file",
            error: err.message
        });
    }

    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' });
}