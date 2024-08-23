import { RequestHandler } from "express";
import { z } from "zod";
import { makeEditAccountUseCase } from "@/app/factories/make-edit-account-use-case";
import { dataUpdate } from "@/app/interfaces/account-interfaces";

export const editAccountController: RequestHandler = async (req, res) => {
    const editAccountParamsSchema = z.object({
        id: z.string().uuid()
    });

    const editAccountBodySchema = z.object({
        name: z.string().optional(),
        authorName: z.string().optional(), 
        email: z.string().email().optional(),
        password: z.string().min(8).optional(),
        cnpj_cpf: z.string().optional(),
        phone: z.string().trim().optional(),
        state: z.string().optional(),
        city: z.string().optional(),
        cep: z.string().max(10).optional(),
        address: z.string().optional(),
    });

    const { id } = editAccountParamsSchema.parse(req.params);
    const data: dataUpdate = editAccountBodySchema.parse(req.body);
    const avatarImage = req.file?.path;

    try {
        const editAccountUseCase = makeEditAccountUseCase();
        await editAccountUseCase.execute({
            id, data, avatarImage
        });

        return res.status(204).json()

    } catch (error) {
        if (error) {
            return res.status(400).json({ message: 'Account Not Found.' });
        }
        throw error
    }
}