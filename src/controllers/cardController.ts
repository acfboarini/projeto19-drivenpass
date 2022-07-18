import { Request, Response } from "express";
import cardRepository from "../repositories/cardRepository.js";
import cardService from "../services/cardService.js";

export async function createCard(req: Request, res: Response) {

    const { user } = res.locals;

    try {
        await cardService.createCard(req.body, user.id);
        return res.status(201).send("Cartão criado com sucesso!");

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getCards(req: Request, res: Response) {

    const { user } = res.locals;

    try {
        const cards = await cardService.getCards(user.id);
        return res.status(201).send(cards);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getCardById(req: Request, res: Response) {

    const { card } = res.locals;

    try {
        const cardDecrypted = cardService.formatCard(card);
        return res.status(201).send(cardDecrypted);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteCardById(req: Request, res: Response) {

    const { card } = res.locals;

    try {
        await cardRepository.deleteById(card.id);
        return res.status(201).send("Cartão deletado com sucesso!");

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}