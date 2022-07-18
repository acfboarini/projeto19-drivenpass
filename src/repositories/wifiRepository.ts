import { prisma } from "../config/database.js";
import { CreateWifiData } from "../services/wifiService.js";

// funcao que insere os dados da wifi no banco de dados
async function insert(wifiData: CreateWifiData) {
    await prisma.wifi.create({
        data: wifiData
    })
}

// funcao que busca todas os wifis do usuario passado via userId
async function get(userId: number) {
    return await prisma.wifi.findMany({
        where: {
            userId
        }
    })
}

// funcao que busca a wifi passada via wifiId
async function getById(wifiId: number) {
    return await prisma.wifi.findUnique({
        where: {
            id: wifiId
        }
    })
}

// funcao que deleta a wifi passada via wifiId
async function deleteById(wifiId: number) {
    await prisma.wifi.delete({
        where: {
            id: wifiId
        }
    })
}

const wifiRepository = {
    insert, get, getById, deleteById
}

export default wifiRepository;