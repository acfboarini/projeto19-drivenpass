import { NextFunction, Request, Response } from "express";
import wifiRepository from "../repositories/wifiRepository.js";
import { wifiSchema } from "../schemas/wifiSchema.js";


// funcao que valida se os dados do Wifi estao de acordo com o wifiSchema
export function validateWifiSchema(req: Request, res: Response, next: NextFunction) {

    const validation = wifiSchema.validate(req.body);
    if (validation.error) {
        return res.status(404).send({error: validation.error.message});
    }

    next();
}

// funcao que valida se o Wifi passado via params existe e se ela pertence ao usuario que esta fazendo a requisicao
export async function validateIsWifiUser(req: Request, res: Response, next: NextFunction) {

    const { wifiId } = req.params;
    const { user } = res.locals;
    
    const wifi = await wifiRepository.getById(Number(wifiId));

    if (!wifi) {
        return res.status(404).send("Wifi Inexistente");
    } else if (wifi.userId !== user.id) {
        return res.status(401).send("Este Wifi pertence a outro usuario");
    } else {
        res.locals.wifi = wifi;
        next();
    }
}