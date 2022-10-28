import { NextFunction, Request, Response } from "express";
import userRepository from "../repositories/userRepository.js";

export async function authorization(req: Request, res: Response, next: NextFunction) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.status(401).send("token not to be null");

    const result = await userRepository.getByToken(token);
    if (!result) return res.status(401).send("invalid token");
    
    res.locals.token = token;
    res.locals.user = result.user;
    next();
}