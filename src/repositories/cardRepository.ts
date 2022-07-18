import { prisma } from "../config/database.js";
import { CreateCardData } from "../services/cardService.js";

// funcao que insere os dados da card no banco de dados
async function insert(cardData: CreateCardData) {
    await prisma.card.create({
        data: cardData
    })
}

// funcao que busca todas as credenciais do usuario passado via userId
async function get(userId: number) {
    return await prisma.card.findMany({
        where: {
            userId
        }
    })
}

// funcao que busca a card passada via cardId
async function getById(cardId: number) {
    return await prisma.card.findUnique({
        where: {
            id: cardId
        }
    })
}

// funcao que deleta a card passada via cardId
async function deleteById(cardId: number) {
    await prisma.card.delete({
        where: {
            id: cardId
        }
    })
}

const cardRepository = {
    insert, get, getById, deleteById
}

export default cardRepository;