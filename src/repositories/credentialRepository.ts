import { prisma } from "../config/database.js";
import { CreateCredentialData } from "../services/credentialService.js";

// funcao que insere os dados da credencial no banco de dados
async function insert(credentialData: CreateCredentialData) {
    await prisma.credential.create({
        data: credentialData
    })
}

// funcao que busca todas as credenciais do usuario passado via userId
async function get(userId: number) {
    return await prisma.credential.findMany({
        where: {
            userId
        }
    })
}

// funcao que busca a credencial passada via credentialId
async function getById(credentialId: number) {
    return await prisma.credential.findUnique({
        where: {
            id: credentialId
        }
    })
}

// funcao que deleta a credencial passada via credentialId
async function deleteById(credentialId: number) {
    await prisma.credential.delete({
        where: {
            id: credentialId
        }
    })
}

const credentialRepository = {
    insert, get, getById, deleteById
}

export default credentialRepository;