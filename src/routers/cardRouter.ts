import { Router } from "express";
import { createCard, deleteCardById, getCardById, getCards } from "../controllers/cardController.js";
import { authorization } from "../middlewares/authMiddleware.js";
import { validateCardSchema, validateIsCardUser } from "../middlewares/cardMiddleware.js";

const cardRouter = Router();

cardRouter.post("/cards", validateCardSchema, authorization, createCard);
cardRouter.get("/cards", authorization, getCards);
cardRouter.get("/cards/:cardId", authorization, validateIsCardUser, getCardById);
cardRouter.delete("/cards/:cardId", authorization, validateIsCardUser, deleteCardById);

export default cardRouter;