import Joi from "joi";
import { CreateCardData } from "../services/cardService.js";

export const cardSchema = Joi.object({
    number: Joi.string().required(),
    name: Joi.string().required(),
    securityCode: Joi.string().required(),
    expirationDate: Joi.string().required(),
    password: Joi.string().required(),
    isVirtual: Joi.boolean(),
    type: Joi.string().required(),
})