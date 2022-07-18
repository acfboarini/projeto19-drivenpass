import Joi from "joi";

// colocar .min(10) no password na aplicacao final
export const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})