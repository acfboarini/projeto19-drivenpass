import { Request, Response } from "express";
import noteRepository from "../repositories/noteRepository.js";
import noteService from "../services/noteService.js";

export async function createNote(req: Request, res: Response) {

    const { user } = res.locals;

    try {
        await noteService.insertNote(req.body, user.id);
        return res.status(201).send("Nota criada com sucesso!");

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getNotes(req: Request, res: Response) {

    const { user } = res.locals;

    try {
        const notes = await noteRepository.get(user.id);
        return res.status(201).send(notes);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getNoteById(req: Request, res: Response) {

    const { note } = res.locals;

    try {
        return res.status(201).send(note);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteNoteById(req: Request, res: Response) {

    const { note } = res.locals;

    try {
        await noteRepository.deleteById(note.id);
        return res.status(201).send("Nota deletada com sucesso!");

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}