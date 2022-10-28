import { prisma } from "../config/database.js";
import { CreateUserData } from "../services/authService.js";

async function insert(userData: CreateUserData) {
    await prisma.user.create({
        data: userData
    })
}

async function getByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email }
    });
}

async function getByToken(token: string) {
    return await prisma.session.findUnique({
        where: { token },
        select: {
            user: true
        }
    });
}

const userRepository = {
    insert, getByEmail, getByToken 
}

export default userRepository;