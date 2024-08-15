import { env } from "@/env/schema";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authorizationMiddleware: RequestHandler = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const [, token] = authHeader.split(" ");

    try {
        jwt.verify(token, env.PRIVATE_KEY);
        return next();     
    
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
        throw error
    }
}