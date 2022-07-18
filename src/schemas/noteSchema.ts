import Joi from "joi";

export const noteSchema = Joi.object({
    title: Joi.string().max(50).required(),
    anotation: Joi.string().max(1000).required()
})