import { prisma } from "../config/database.js";
import { CreateSessionData } from "../services/authService.js";

async function createSession(sessionData: CreateSessionData) {
    return await prisma.session.create({
        data: sessionData
    }) 
}

async function singOut(token: string) {
    return await prisma.session.delete({
        where: {
            token
        }
    })
}

export const authRepository = {
    createSession, singOut
}

export default authRepository;