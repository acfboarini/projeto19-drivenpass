import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function validateSchemaMiddleware(schema: ObjectSchema) {
  return function (req: Request, res: Response, next: NextFunction) {
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(422).send(validation.error.message);
    }
    next();
  }
}