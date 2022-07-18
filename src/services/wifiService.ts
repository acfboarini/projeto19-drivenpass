import { Wifi } from "@prisma/client";
import Cryptr from "cryptr";
import wifiRepository from "../repositories/wifiRepository.js";


export type CreateWifiData = Omit<Wifi, "id">

// funcao que insere os dados do cartão usando o insert do wifiRepository
async function createWifi(data: CreateWifiData, userId: number) {

    const wifiData = {
        ...data, 
        userId,
        password: encryptData(data.password),
    }
    await wifiRepository.insert(wifiData);
}

// funcao que faz a criptografia da senha/Codigo de segurança(CVV) passado por parametro
function encryptData(password: string) {
    const cryptr = new Cryptr('myTotallySecretKey');
    const encryptedPassword = cryptr.encrypt(password);

    return encryptedPassword;
}

// funcao que retorna todas os cartoes referentes ao usuario passado por parametro retornando-as com as senhas e CVVs descriptografadas
async function getWifis(userId: number) {
    const wifis = await wifiRepository.get(userId);

    return wifis.map(wifi => {
        return {
            ...wifi, 
            password: decryptData(wifi.password)
        }
    })
}

// funcao que retorna a wifi passada por parametro com a senha descriptografada
function formatWifi(wifi: Wifi) {
    return {
        ...wifi,
        password: decryptData(wifi.password)
    }
}

// funcao que descriptografa a senha passada por parametro
function decryptData(encryptedData: string) {
    const cryptr = new Cryptr('myTotallySecretKey');

    const decryptedData = cryptr.decrypt(encryptedData);
    return decryptedData;
}

const wifiService = {
    createWifi, getWifis, formatWifi
}

export default wifiService;