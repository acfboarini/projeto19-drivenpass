import { NextFunction, Request, Response } from "express";
import cardRepository from "../repositories/cardRepository.js";
import { cardSchema } from "../schemas/cardSchema.js";


// funcao que valida se os dados do cartão estao de acordo com o cardSchema
export function validateCardSchema(req: Request, res: Response, next: NextFunction) {

    const validation = cardSchema.validate(req.body);
    if (validation.error) {
        return res.status(404).send({error: validation.error.message});
    }

    next();
}

// funcao que valida se o cartão passado via params existe e se ela pertence ao usuario que esta fazendo a requisicao
export async function validateIsCardUser(req: Request, res: Response, next: NextFunction) {

    const { cardId } = req.params;
    const { user } = res.locals;
    
    const card = await cardRepository.getById(Number(cardId));

    if (!card) {
        return res.status(404).send("Cartão Inexistente");
    } else if (card.userId !== user.id) {
        return res.status(401).send("Este cartão pertence a outro usuario");
    } else {
        res.locals.card = card;
        next();
    }
}