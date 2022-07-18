import { Card } from "@prisma/client";
import Cryptr from "cryptr";
import cardRepository from "../repositories/cardRepository.js";

export type cardType = 
    | "credit"
    | "debit"
    | "credit&debit"
;

export type CreateCardData = Omit<Card, "id">

// funcao que insere os dados do cartão usando o insert do cardRepository
async function createCard(data: CreateCardData, userId: number) {

    const cardData = {
        ...data, 
        userId,
        password: encryptData(data.password),
        securityCode: encryptData(data.securityCode) 
    }
    await cardRepository.insert(cardData);
}

// funcao que faz a criptografia da senha/Codigo de segurança(CVV) passado por parametro
function encryptData(password: string) {
    const cryptr = new Cryptr('myTotallySecretKey');
    const encryptedPassword = cryptr.encrypt(password);

    return encryptedPassword;
}

// funcao que retorna todas os cartoes referentes ao usuario passado por parametro retornando-as com as senhas e CVVs descriptografadas
async function getCards(userId: number) {
    const cards = await cardRepository.get(userId);

    return cards.map(card => {
        return {
            ...card, 
            securityCode: decryptData(card.securityCode),
            password: decryptData(card.password)
        }
    })
}

// funcao que retorna a card passada por parametro com a senha descriptografada
function formatCard(card: Card) {
    return {
        ...card, 
        securityCode: decryptData(card.securityCode),
        password: decryptData(card.password)
    }
}

// funcao que descriptografa a senha passada por parametro
function decryptData(encryptedData: string) {
    const cryptr = new Cryptr('myTotallySecretKey');

    const decryptedData = cryptr.decrypt(encryptedData);
    return decryptedData;
}

const cardService = {
    createCard, getCards, formatCard
}

export default cardService;