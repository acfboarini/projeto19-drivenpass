import { Request, Response } from "express";
import wifiRepository from "../repositories/wifiRepository.js";
import wifiService from "../services/wifiService.js";

export async function createWifi(req: Request, res: Response) {

    const { user } = res.locals;

    try {
        await wifiService.createWifi(req.body, user.id);
        return res.status(201).send("Wifi registrado com sucesso!");

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getWifis(req: Request, res: Response) {

    const { user } = res.locals;

    try {
        const wifis = await wifiService.getWifis(user.id);
        return res.status(201).send(wifis);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getWifiById(req: Request, res: Response) {

    const { wifi } = res.locals;

    try {
        const wifiDecrypted = wifiService.formatWifi(wifi);
        return res.status(201).send(wifiDecrypted);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteWifiById(req: Request, res: Response) {

    const { wifi } = res.locals;

    try {
        await wifiRepository.deleteById(wifi.id);
        return res.status(201).send("Wifi deletado com sucesso!");

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}