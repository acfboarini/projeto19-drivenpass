import { NextFunction, Request, Response } from "express";
import credentialRepository from "../repositories/credentialRepository.js";
import { credentialSchema } from "../schemas/credentialSchema.js";

// funcao que valida se os dados da credencial estao de acordo com o credencialSchema
export function validateCredentialSchema(req: Request, res: Response, next: NextFunction) {

    const validation = credentialSchema.validate(req.body);
    if (validation.error) {
        return res.status(404).send({error: validation.error.message});
    }

    next();
}

// funcao que valida se a credencial passada via params existe e se ela pertence ao usuario que esta fazendo a requisicao
export async function validateIsCredentialUser(req: Request, res: Response, next: NextFunction) {

    const { credentialId } = req.params;
    const { user } = res.locals;
    
    const credential = await credentialRepository.getById(Number(credentialId));

    if (!credential) {
        return res.status(404).send("Credencial Inexistente");
    } else if (credential.userId !== user.id){
        return res.status(401).send("Esta credencial pertence a outro usuario");
    } else {
        res.locals.credential = credential;
        next();
    }
}