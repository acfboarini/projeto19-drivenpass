import { prisma } from "../config/database.js";
import { CreateNoteData } from "../services/noteService.js";

// funcao que insere os dados da nota segura no banco de dados
async function insert(noteData: CreateNoteData) {
    await prisma.note.create({
        data: noteData
    })
}

// funcao que busca todas as credenciais do usuario passado via userId
async function get(userId: number) {
    return await prisma.note.findMany({
        where: {
            userId
        }
    })
}

// funcao que busca a nota segura passada via noteId
async function getById(noteId: number) {
    return await prisma.note.findUnique({
        where: {
            id: noteId
        }
    })
}

// funcao que deleta a nota segura passada via noteId
async function deleteById(noteId: number) {
    await prisma.note.delete({
        where: {
            id: noteId
        }
    })
}

const noteRepository = {
    insert, get, getById, deleteById
}

export default noteRepository;