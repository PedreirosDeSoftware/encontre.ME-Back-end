import { makeAuthenticateUseCase } from "@/app/factories/make-authenticate-use-case";
import { InvalidCredentialsError } from "@/app/exceptions/invalid-credentials-error";
import { RequestHandler } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { env } from "@/env/schema";

export const authenticateController: RequestHandler = async (req, res) => {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    })

    const { email, password } = authenticateBodySchema.parse(req.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase();
        
        const { user } =  await authenticateUseCase.execute({
            email, password
        });

        const refreshToken = jwt.sign({ sub: user.id, name: user.name }, 
            env.PRIVATE_KEY, { expiresIn: '7d' });

        const token = jwt.sign({ sub: user.id, name: user.name }, 
            env.PRIVATE_KEY, { expiresIn: '10m' });
          
        return res
            .cookie('refreshToken', refreshToken, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: true,
            })
            .status(200).json({ token });

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return res.status(400).json({ message: error.message });
        }
        throw error
    }
}