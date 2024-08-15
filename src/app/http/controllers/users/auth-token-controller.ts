import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface PayLoad {
    sub?: string | undefined;
    name?: string | undefined;
}

export const authTokenController: RequestHandler = async (req, res) => {
    const authHeader = req.headers.authorization as string;
    const [, token] = authHeader.split(" ");

    try {
        const authToken = jwt.decode(token) as PayLoad;        
        return res.status(200).json({ 
            authToken: {
                id: authToken?.sub,
                name: authToken.name,
            } 
        });
             
    } catch (error) {
        if (error) return res.status(400).json({ message: "Invalid Request" });
        
    }
}