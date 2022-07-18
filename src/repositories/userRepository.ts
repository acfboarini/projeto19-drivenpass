import { prisma } from "../config/database.js";

async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email
        }
    })
}

async function getUserByToken(token: string) {
    return await prisma.session.findUnique({
        where: {
            token
        },
        select: {
            user: true
        }
    })
}

const userRepository = {
    getUserByEmail, getUserByToken 
}

export default userRepository;