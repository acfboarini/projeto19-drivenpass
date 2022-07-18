import { Note } from "@prisma/client";
import noteRepository from "../repositories/noteRepository.js";

export type CreateNoteData = Omit<Note, "id">

async function insertNote(data: CreateNoteData, userId: number) {

    const credentialData = {...data, userId };
    return await noteRepository.insert(credentialData);
}

const noteService = {
    insertNote, 
}

export default noteService;