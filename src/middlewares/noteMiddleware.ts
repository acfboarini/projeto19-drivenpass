import { NextFunction, Request, Response } from "express";
import noteRepository from "../repositories/noteRepository.js";
import { noteSchema } from "../schemas/noteSchema.js";

// funcao que valida se os dados da notas estao de acordo com o notasSchema
export function validateNoteSchema(req: Request, res: Response, next: NextFunction) {

    const validation = noteSchema.validate(req.body);
    if (validation.error) {
        return res.status(404).send({error: validation.error.message});
    }

    next();
}

// funcao que valida se a notas passada via params existe e se ela pertence ao usuario que esta fazendo a requisicao
export async function validateIsNoteUser(req: Request, res: Response, next: NextFunction) {

    const { noteId } = req.params;
    const { user } = res.locals;
    
    const note = await noteRepository.getById(Number(noteId));

    if (!note) {
        return res.status(404).send("Nota Inexistente");
    } else if (note.userId !== user.id){
        return res.status(401).send("Esta nota pertence a outro usuario");
    } else {
        res.locals.note = note;
        next();
    }
}