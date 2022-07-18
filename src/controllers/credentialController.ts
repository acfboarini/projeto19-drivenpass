import { Request, Response } from "express";
import credentialRepository from "../repositories/credentialRepository.js";
import credentialService from "../services/credentialService.js";

export async function createCredential(req: Request, res: Response) {

    const { user } = res.locals;

    try {
        await credentialService.insertCredential(req.body, user.id);
        return res.status(201).send("Credencial criada com sucesso!");

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getCredentials(req: Request, res: Response) {

    const { user } = res.locals;

    try {
        const credentials = await credentialService.getCredentials(user.id);
        return res.status(201).send(credentials);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getCredentialById(req: Request, res: Response) {

    const { credential } = res.locals;

    try {
        const credentialDecrypted = credentialService.formatCredential(credential);
        return res.status(201).send(credentialDecrypted);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteCredential(req: Request, res: Response) {

    const { credential } = res.locals;

    try {
        await credentialRepository.deleteById(credential.id);
        return res.status(201).send("Credencial deletada com sucesso!");

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}