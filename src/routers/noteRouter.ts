import { Router } from "express";
import { createNote, deleteNoteById, getNoteById, getNotes } from "../controllers/noteController.js";
import { authorization } from "../middlewares/authMiddleware.js";
import { validateIsNoteUser, validateNoteSchema } from "../middlewares/noteMiddleware.js";

const noteRouter = Router();

noteRouter.post("/notes", validateNoteSchema, authorization, createNote);
noteRouter.get("/notes", authorization, getNotes);
noteRouter.get("/notes/:noteId", authorization, validateIsNoteUser, getNoteById);
noteRouter.delete("/notes/:noteId", authorization, validateIsNoteUser, deleteNoteById);

export default noteRouter;