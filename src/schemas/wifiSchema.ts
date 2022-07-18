import Joi from "joi";

export const wifiSchema = Joi.object({
    title: Joi.string().required(),
    networkName: Joi.string().required(),
    password: Joi.string().required()
})