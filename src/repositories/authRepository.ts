import { prisma } from "../config/database.js";
import { CreateSessionData, CreateUserData } from "../services/authService.js";

async function insertUser(userData: CreateUserData) {
    return await prisma.user.create({
        data: userData
    })
}

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
    insertUser, createSession, singOut
}

export default authRepository;