import { NextFunction, Request, Response } from "express";
import joi from "joi";

const schema = joi.object({
  recipientName: joi.string().required(),
  address: joi.string().required(),
  status: joi.string().valid("pending", "delivered").required(),
});

export function validation(request: Request, response: Response, next: NextFunction): void {
  const { error } = schema.validate(request.body);

  if (error) {
    response.status(400).json({ message: error.details[0].message });
    return;
  }

  next();
}
